import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';



@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
   @ViewChild('gridContainer', { static: true }) gridContainer!: ElementRef<HTMLDivElement>;
  private time = 0;
  private pixelElements: HTMLDivElement[][] = [];
  private gridSize = 32;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.createPixelGrid();
    this.startAnimation();

    // Animate pixel-grid-container scale + opacity on scroll
    gsap.fromTo(
      '.pixel-grid-container',
      { scale: 0.5, opacity: 1 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pixel-grid-container',
          start: 'top 90%',
          end: 'bottom 50%',
          scrub: true,
        },
      }
    );

    // Fade in overlay content after pixel scale
    gsap.fromTo(
      '.overlay-content',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.pixel-grid-container',
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: true,
        },
      }
    );
  }

  private createPixelGrid(): void {
    const container = this.gridContainer.nativeElement;
    container.innerHTML = ''; // Clear if any

    for (let y = 0; y < this.gridSize; y++) {
      const row: HTMLDivElement[] = [];
      for (let x = 0; x < this.gridSize; x++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        container.appendChild(pixel);
        row.push(pixel);
      }
      this.pixelElements.push(row);
    }
  }

  private R(x: number, y: number, time: number): number {
    return Math.floor(64 + 80 * Math.cos((x * x - y * y) / 300 + time));
  }

  private G(x: number, y: number, time: number): number {
    return Math.floor(20 + 30 * Math.sin((x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300));
  }

  private B(x: number, y: number, time: number): number {
    return Math.floor(100 + 155 * Math.sin(5 * Math.sin(time / 9) + ((x - 16) ** 2 + (y - 16) ** 2) / 1100));
  }

  private startAnimation(): void {
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        const r = this.R(x, y, this.time);
        const g = this.G(x, y, this.time);
        const b = this.B(x, y, this.time);
        const color = `rgb(${r}, ${g}, ${b})`;

        const pixel = this.pixelElements[y][x];
        pixel.style.backgroundColor = color;
      }
    }

    this.time += 0.03;
    requestAnimationFrame(() => this.startAnimation());
  }
}
