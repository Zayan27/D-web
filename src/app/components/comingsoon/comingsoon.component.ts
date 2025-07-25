import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

@Component({
  selector: 'app-comingsoon',
  standalone: true,
  imports: [],
  templateUrl: './comingsoon.component.html',
  styleUrl: './comingsoon.component.scss'
})
export class ComingsoonComponent {
days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  targetDate: Date = new Date('2025-08-11T00:00:00');

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    this.initAnimations();
    this.startCountdown();
    setInterval(() => this.startCountdown(), 1000);
  }

  initAnimations(): void {
    // Initial animations
    gsap.from('.logo', { 
      duration: 1, 
      y: -50, 
      opacity: 0, 
      ease: 'power3.out' 
    });

    gsap.from('.heading', { 
      duration: 1.5, 
      y: 50, 
      opacity: 0, 
      delay: 0.3, 
      ease: 'elastic.out(1, 0.5)' 
    });

    gsap.from('.subheading', { 
      duration: 1, 
      opacity: 0, 
      delay: 0.8, 
      ease: 'power2.inOut' 
    });

    gsap.from('.countdown-item', { 
      duration: 1, 
      y: 30, 
      opacity: 0, 
      stagger: 0.2, 
      delay: 1.2, 
      ease: 'back.out(1.7)' 
    });

    gsap.from('.subscribe-form', { 
      duration: 1, 
      y: 30, 
      opacity: 0, 
      delay: 1.8, 
      ease: 'power3.out' 
    });

    



    // Background elements animation
    gsap.to('.bg-blob-1', { 
      duration: 15, 
      x: 50, 
      y: 30, 
      repeat: -1, 
      yoyo: true, 
      ease: 'sine.inOut' 
    });

    gsap.to('.bg-blob-2', { 
      duration: 20, 
      x: -30, 
      y: -40, 
      repeat: -1, 
      yoyo: true, 
      ease: 'sine.inOut' 
    });

    gsap.to('.bg-blob-3', { 
      duration: 25, 
      x: 20, 
      y: 50, 
      repeat: -1, 
      yoyo: true, 
      ease: 'sine.inOut' 
    });
  }

  startCountdown(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Animate countdown numbers
    gsap.to('.countdown-number', { 
      duration: 0.5, 
      scale: 1.1, 
      yoyo: true, 
      repeat: 1, 
      ease: 'power2.inOut' 
    });
  }

  subscribe(event: Event): void {
    event.preventDefault();
    const emailInput = (event.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
    
    if (emailInput.value) {
      gsap.to('.subscribe-form', {
        duration: 0.5,
        y: -10,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut'
      });
      
      gsap.to('.success-message', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        onComplete: () => {
          setTimeout(() => {
            gsap.to('.success-message', { duration: 0.5, opacity: 0, y: -20 });
          }, 3000);
        }
      });
      
      emailInput.value = '';
    } else {
      gsap.to('.subscribe-form', {
        keyframes: [
          { x: -5 },
          { x: 5 },
          { x: -5 },
          { x: 5 },
          { x: 0 }
        ],
        duration: 0.5,
        ease: 'power1.inOut'
      });

    }
  }

}
