import { Component, AfterViewInit } from '@angular/core';
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
export class TestimonialCompComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // Animate both rows (1 = left to right, -1 = right to left)
    this.initMarquee('.scroll-row-1', 1);
    this.initMarquee('.scroll-row-2', -1);
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
      xPercent: direction * -80, // move half width
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

    // Scroll-triggered speed boost
    ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const speedBoost = 1 + Math.abs(velocity) / 3000;
        tween.timeScale(speedBoost);
      },
    });
  }
}
