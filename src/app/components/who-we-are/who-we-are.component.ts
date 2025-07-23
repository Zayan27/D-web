import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [],
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})
export class WhoWeAreComponent implements AfterViewInit{
   @ViewChild('whoWeAreSection') sectionRef!: ElementRef;

  ngAfterViewInit() {
    const section = this.sectionRef.nativeElement;

    // Animate heading text
    gsap.from(section.querySelector('.whoWeAreHeading'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });

    // Animate left star
    gsap.from(section.querySelector('.starLeft'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out',
    });

    // Animate right star
    gsap.from(section.querySelector('.starRight'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out',
    });
  }

}
