import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollService } from '../../shared/services/scroll.service';
import { AutoplayVideoDirective } from '../../shared/directives/autoplay-video.directive';

@Component({
  selector: 'app-full-page-menu',
  standalone: true,
  imports: [AutoplayVideoDirective],
  templateUrl: './full-page-menu.component.html',
  styleUrl: './full-page-menu.component.scss'
})
export class FullPageMenuComponent implements AfterViewInit, OnDestroy {
  menuOpen = false;
  private ctx = gsap.context(() => {});

  constructor(private scrollService: ScrollService) {}

  @ViewChild('menuOverlay', { static: false }) menuOverlay!: ElementRef;
  @ViewChild('menuHeaderText') menuHeaderText!: ElementRef;
  @ViewChild('menu-content') menucontent!: ElementRef;

  ngAfterViewInit() {
  }
  toggleMenu(): void {
  this.menuOpen = !this.menuOpen;

  this.ctx.add(() => {
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
  });
}

  ngOnDestroy(): void {
    this.ctx.revert();
  }





  navigateTo(id: string): void {
    this.scrollService.scrollTo(id);
    this.toggleMenu();
  }
}
