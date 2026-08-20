import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.scss'
})
export class OurTeamComponent implements AfterViewInit, OnDestroy {
  balls = Array.from({ length: 6 }); // 6 balls
  private ctx!: gsap.Context;

  @ViewChildren('ball') ballEls!: QueryList<ElementRef<HTMLDivElement>>;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
    this.ballEls.forEach((ref, i) => {
      const el = ref.nativeElement;
      const dir = i % 2 === 0 ? 1 : -1;

      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      });

      gsap.to(el, {
        x: `+=${dir * (100 + Math.random() * 200)}`,
        y: `-=${50 + Math.random() * 150}`,
        duration: 4 + Math.random() * 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    });
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
