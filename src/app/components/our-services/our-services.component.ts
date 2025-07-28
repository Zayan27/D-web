import { Component, ViewChildren, ViewChild, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgFor } from '@angular/common';


gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [NgFor],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent implements AfterViewInit {
  @ViewChild('sectionHeader', { static: true }) sectionHeader!: ElementRef;


  items = [
    {
      number: '01',
      title: 'FRONT END DEVELOPMENT',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tempora architecto aspernatur perferendis. Voluptas quidem nam voluptate sit unde ad mollitia commodi iste aliquam modi, eveniet, numquam accusamus cupiditate facilis optio natus est eius minima provident, dicta minus quia laboriosam nobis ipsum. Reiciendis nam adipisci sit expedita sint quo necessitatibus?',
      techs:['Angular', 'ReactJS']
    },
    {
      number: '02',
      title: 'BACK END DEVELOPMENT',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tempora architecto aspernatur perferendis. Voluptas quidem nam voluptate sit unde ad mollitia commodi iste aliquam modi, eveniet, numquam accusamus cupiditate facilis optio natus est eius minima provident, dicta minus quia laboriosam nobis ipsum. Reiciendis nam adipisci sit expedita sint quo necessitatibus?',
      techs:['Angular', 'ReactJS']
    },
    {
      number: '03',
      title: 'FRONT END DEVELOPMENT',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tempora architecto aspernatur perferendis. Voluptas quidem nam voluptate sit unde ad mollitia commodi iste aliquam modi, eveniet, numquam accusamus cupiditate facilis optio natus est eius minima provident, dicta minus quia laboriosam nobis ipsum. Reiciendis nam adipisci sit expedita sint quo necessitatibus?',
      techs:['Angular', 'ReactJS']
    },
    {
      number: '04',
      title: 'BACK END DEVELOPMENT',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tempora architecto aspernatur perferendis. Voluptas quidem nam voluptate sit unde ad mollitia commodi iste aliquam modi, eveniet, numquam accusamus cupiditate facilis optio natus est eius minima provident, dicta minus quia laboriosam nobis ipsum. Reiciendis nam adipisci sit expedita sint quo necessitatibus?',
      techs:['Angular', 'ReactJS']
    },
    {
      number: '05',
      title: 'FRONT END DEVELOPMENT',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tempora architecto aspernatur perferendis. Voluptas quidem nam voluptate sit unde ad mollitia commodi iste aliquam modi, eveniet, numquam accusamus cupiditate facilis optio natus est eius minima provident, dicta minus quia laboriosam nobis ipsum. Reiciendis nam adipisci sit expedita sint quo necessitatibus?',
      techs:['Angular', 'ReactJS']
    },
    {
      number: '06',
      title: 'BACK END DEVELOPMENT',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tempora architecto aspernatur perferendis. Voluptas quidem nam voluptate sit unde ad mollitia commodi iste aliquam modi, eveniet, numquam accusamus cupiditate facilis optio natus est eius minima provident, dicta minus quia laboriosam nobis ipsum. Reiciendis nam adipisci sit expedita sint quo necessitatibus?',
      techs:['Angular', 'ReactJS']
    }
  ];

  activeIndex: number | null = null;

  @ViewChildren('serviceText', { read: ElementRef }) serviceTexts!: QueryList<ElementRef>;
  @ViewChildren('servicesSection', { read: ElementRef }) servicesSection!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.initAnimations();
    this.serviceTexts.changes.subscribe(() => this.initAnimations());

    this.setupScrollTrigger();
    this.serviceTexts.changes.subscribe(() => this.initAnimations());
  }

  private initAnimations() {
    this.serviceTexts.forEach(el => {
      gsap.set(el.nativeElement, { height: 0, opacity: 0, display: 'none' });
    });
  }

  toggleItem(index: number) {
    if (this.activeIndex === index) {
      this.animateClose(this.serviceTexts.get(index));
      this.activeIndex = null;
    } else {
      if (this.activeIndex !== null) {
        this.animateClose(this.serviceTexts.get(this.activeIndex));
      }
      this.activeIndex = index;
      this.animateOpen(this.serviceTexts.get(index));
    }
  }

  animateOpen(elRef: ElementRef | undefined) {
    if (!elRef) return;
    const el = elRef.nativeElement;
    gsap.set(el, { display: 'block' });
    gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      {
        height: el.scrollHeight,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(el, { height: 'auto' });
        }
      }
    );
  }

  private setupScrollTrigger() {
  const container = document.querySelector('.mainContainer');
  if (!container) return;

  ScrollTrigger.create({
    trigger: container,
    start: 'top 80%',
    onEnter: () => this.animateServicesList(),
    onEnterBack: () => this.animateServicesList(),
  });
}

private animateServicesList() {
  const items = document.querySelectorAll('.services-list li');
  gsap.fromTo(
    items,
    {
      opacity: 0,
      x: 70,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    }
  );
}


  animateClose(elRef: ElementRef | undefined) {
    if (!elRef) return;
    const el = elRef.nativeElement;
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(el, { display: 'none' });
      }
    });
  }
}
