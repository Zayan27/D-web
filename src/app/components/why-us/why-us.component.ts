import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [],
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss']
})
export class WhyUsComponent implements AfterViewInit {
  @ViewChild('whyUsSection') sectionRef!: ElementRef;

  ngAfterViewInit(): void {
  const section = this.sectionRef.nativeElement;
  const textEl = section.querySelector('.whyusText');
  const columns = section.querySelectorAll('.gsap-column');

  if (!textEl) return;

  // Delay to ensure layout is ready
  requestAnimationFrame(() => {
    const split = new SplitText(textEl, {
      type: 'lines',
      linesClass: 'line-wrapper'
    });

    gsap.from(split.lines, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.15,
    });

    // Animate each column individually
    gsap.registerPlugin(ScrollTrigger);

columns.forEach((column: HTMLElement, index: number) => {
  // Set initial state (hidden)
  gsap.set(column, { willChange: 'transform, opacity' });
  

  // Create timeline for sequenced animations
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: column,
      start: 'top 85%',
      toggleActions: 'play none none reset' // Resets when scrolled back out
    }
  });
  tl.to(column, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power3.out',
    delay: index * 0.1
  });

  tl.from(column.querySelectorAll('*'), {
    opacity: 0,
    y: 15,
    duration: 0.4,
    stagger: 0.08,
    ease: 'sine.out'
  }, '<+0.2');

 
  column.addEventListener('mouseenter', () => {
    gsap.to(column, { scale: 1.03, duration: 0.25 });
  });
  column.addEventListener('mouseleave', () => {
    gsap.to(column, { scale: 1, duration: 0.25 });
  });
});

    // Refresh ScrollTrigger after DOM is painted
    ScrollTrigger.refresh();
    
  });
}

}
