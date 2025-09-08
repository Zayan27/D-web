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
      title: 'FULL STACK DEVELOPMENT',
      description: 'We build complete web solutions from frontend to backend, delivering scalable, secure, and user-friendly applications tailored to your business needs.',
      techs: ['MEAN', 'MERN', '.NET', 'Python', 'PostgreSQL', 'MongoDB']
    },
    {
      number: '02',
      title: 'FRONTEND DEVELOPMENT',
      description: 'We craft modern, responsive, and interactive user interfaces that bring ideas to life while ensuring excellent user experience across devices.',
      techs: ['Angular', 'React.js', 'Next.js', 'Vue.js', 'SASS', 'Bootstrap', 'TailwindCSS']
    },
    {
      number: '03',
      title: 'BACKEND DEVELOPMENT',
      description: 'We develop secure and scalable backend systems, managing databases, APIs, and server logic to keep your applications running seamlessly.',
      techs: ['Node.js', 'Express.js', 'Django', 'Flask', 'ASP.NET Core', 'Firebase', 'MongoDB', 'PostgreSQL', 'MySQL']
    },
    {
      number: '04',
      title: 'DevOps',
      description: 'We streamline development and operations with CI/CD, cloud deployment, and automation to ensure fast, secure, and reliable software delivery.',
      techs: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'AWS', 'Azure', 'Google Cloud']
    },
    {
      number: '05',
      title: 'Artificial Intelligence (AI)',
      description: 'We design AI-driven solutions including machine learning models, chatbots, and automation systems that enhance business intelligence and efficiency.',
      techs: ['Python', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'OpenAI API']
    },
    {
      number: '06',
      title: 'WordPress Development',
      description: 'We create custom WordPress websites with unique themes, plugins, and SEO-friendly designs that are easy to manage and scale.',
      techs: ['WordPress', 'PHP', 'Elementor', 'WooCommerce', 'MySQL']
    },
    {
      number: '07',
      title: 'Shopify Development',
      description: 'We build high-performing Shopify stores with custom themes, seamless integrations, and optimized checkout flows to maximize conversions.',
      techs: ['Shopify', 'Liquid', 'JavaScript', 'HTML', 'CSS']
    },
    {
      number: '08',
      title: 'Wix Studio',
      description: 'We design sleek, responsive, and professional websites on Wix Studio, tailored to showcase your brand and engage your audience effectively.',
      techs: ['Wix Studio', 'Velo by Wix']
    },
    {
      number: '09',
      title: 'Digital Marketing / SMM',
      description: 'We craft data-driven marketing strategies using social media, paid ads, and content to boost visibility, engagement, and business growth.',
      techs: ['Google Ads', 'Meta Ads', 'HubSpot', 'Mailchimp', 'Hootsuite']
    },
    {
      number: '10',
      title: 'SEO Optimization',
      description: 'We improve search rankings with on-page, off-page, and technical SEO strategies to drive organic traffic and long-term online growth.',
      techs: ['Yoast SEO', 'SEMRush', 'Ahrefs', 'Google Analytics', 'Google Search Console']
    },
    {
      number: '11',
      title: 'Video Editing',
      description: 'We deliver professional video editing with smooth transitions, color correction, effects, and storytelling to create impactful visual content.',
      techs: ['Adobe Premiere Pro', 'After Effects', 'Final Cut Pro', 'DaVinci Resolve']
    },
    {
      number: '12',
      title: '2D / 3D Animation Services',
      description: 'We specialize in creating stunning 2D and 3D animations, offering seamless video editing, dynamic transitions, expert color correction, and visual effects to craft compelling and impactful storytelling.',
      techs: ['Blender', 'Cinema 4D', 'Adobe Animate', 'After Effects', 'Maya', 'Houdini', 'DaVinci Resolve']
    }
  ];

  activeIndex: number | null = null;

  @ViewChildren('serviceText', { read: ElementRef }) serviceTexts!: QueryList<ElementRef>;
  @ViewChildren('servicesSection', { read: ElementRef }) servicesSection!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.initAnimations();
    this.serviceTexts.changes.subscribe(() => this.initAnimations());

    this.setupScrollTrigger();
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
  const items = document.querySelectorAll('.service-item-wrapper');

  items.forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: 70, pointerEvents: 'none' }, // hidden state
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        pointerEvents: 'auto', // re-enable when visible
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 30%',
          toggleActions: 'play reverse play reverse',
          onLeave: () => {
            // 👇 if the current visible service is open and scrolled away → close it
            if (this.activeIndex === i) {
              this.animateClose(this.serviceTexts.get(i));
              this.activeIndex = null;
            }
          },
          onLeaveBack: () => {
            // 👇 same when scrolling back up past it
            if (this.activeIndex === i) {
              this.animateClose(this.serviceTexts.get(i));
              this.activeIndex = null;
            }
          }
        }
      }
    );
  });
}




  animateClose(elRef: ElementRef | undefined) {
    if (!elRef) return;
    const el = elRef.nativeElement;
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.1,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(el, { display: 'none' });
      }
    });
  }
}
