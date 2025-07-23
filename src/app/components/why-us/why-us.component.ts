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

    if (!textEl) return;

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
  }
}
