import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-full-page-menu',
  standalone: true,
  imports: [],
  templateUrl: './full-page-menu.component.html',
  styleUrl: './full-page-menu.component.scss'
})
export class FullPageMenuComponent implements AfterViewInit {
  menuOpen = false;

  @ViewChild('menuOverlay', { static: false }) menuOverlay!: ElementRef;
  @ViewChild('menuHeaderText') menuHeaderText!: ElementRef;
  @ViewChild('menu-content') menucontent!: ElementRef;


  ngAfterViewInit() {
    
  }
  toggleMenu(): void {
  this.menuOpen = !this.menuOpen;

  if (this.menuOpen) {
    // Set initial state for elements (only once)
    gsap.set(['.menuHeaderText', '.menu-content ul li'], { 
      opacity: 0, 
      y: 20,
      pointerEvents: 'none' // Disable pointer events during animation
    });

    const tl = gsap.timeline();

    tl.to('.menu-overlay', {
      y: '0%',
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out'
    })
    .to('.menuHeaderText', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4')
    .to('.menu-content ul li', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        // Enable pointer events after animation completes
        document.querySelectorAll('.menu-content ul li').forEach(li => {
          (li as HTMLElement).style.pointerEvents = 'auto';
        });
      }
    }, '-=0.5');
  } else {
    gsap.to('.menu-overlay', {
      y: '-100%',
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in'
    });
  }
}





  navigateTo(id: string): void {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    this.toggleMenu();
  }
}
