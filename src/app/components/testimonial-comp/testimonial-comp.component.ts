import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-testimonial-comp',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-comp.component.html',
  styleUrl: './testimonial-comp.component.scss',
})
export class TestimonialCompComponent implements AfterViewInit, OnDestroy {
  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    // Animate both rows (1 = left to right, -1 = right to left)
    this.ctx = gsap.context(() => {
      this.initMarquee('.scroll-row-1', 1);
      this.initMarquee('.scroll-row-2', -1);
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  initMarquee(selector: string, direction: number): void {
    const track = document.querySelector(selector) as HTMLElement;
    if (!track) return;

    // Clone children to fill loop
    const cards = Array.from(track.children);
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    // Create GSAP loop animation
    const tween = gsap.to(track, {
      xPercent: direction * -80,
      ease: 'none',
      duration: 90,
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(-50, 0),
      },
    });

    // Pause on hover (desktop)
    track.addEventListener('mouseenter', () => tween.pause());
    track.addEventListener('mouseleave', () => tween.play());

    // Pause on touch (mobile)
    track.addEventListener('touchstart', () => tween.pause());
    track.addEventListener('touchend', () => tween.play());

    // Scroll-triggered speed boost with clamped and smoothed timeScale
    ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const rawBoost = 1 + Math.abs(velocity) / 3000;
        const speedBoost = gsap.utils.clamp(1, 2, rawBoost); // Clamp between 1x and 2x speed

        // Smoothly transition to new timeScale
        gsap.to(tween, {
          timeScale: speedBoost,
          duration: 0.2,
          ease: 'power1.out',
        });
      },
    });
  }
}
