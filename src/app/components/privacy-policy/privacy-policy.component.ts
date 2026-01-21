import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PrivacyPolicyComponent implements OnInit {
  @ViewChild('quickNav', { static: true }) quickNav!: ElementRef;
  showBackToTop = false;
  quickNavOffset = 0;

  lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: 'fas fa-search',
      content: [
        'To provide and manage our services',
        'To respond to inquiries, support requests, or project discussions',
        'To send quotes, proposals, invoices, or contractual documents',
        'To personalize user experience on our website',
        'To improve website functionality, security, and performance',
        'To send marketing or promotional emails (only with your consent)',
        'To comply with legal obligations when required'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: 'fas fa-cog',
      content: [
        'To provide, maintain, and improve our web solutions and services',
        'To communicate with you about our services, updates, and promotional materials',
        'To analyze usage patterns and optimize user experience',
        'To detect, prevent, and address technical issues and security threats'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: 'fas fa-lock',
      content: [
        'We do not sell your personal information to third parties.',
        'We may share information with service providers who assist in our operations, subject to confidentiality agreements.',
        'We may disclose information when required by law or to protect our rights and safety.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: 'fas fa-shield-alt',
      content: [
        'We implement industry-standard security measures to protect your information from unauthorized access, alteration, or destruction.',
        'We use encryption for data transmission and secure servers for data storage.',
        'Regular security audits and updates are performed to maintain the highest level of protection.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: 'fas fa-cookie-bite',
      content: [
        'We use cookies to enhance user experience, analyze site traffic, and personalize content.',
        'You can control cookie preferences through your browser settings.',
        'Third-party analytics tools may be used to understand user behavior and improve our services.'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: 'fas fa-check-circle',
      content: [
        'Access: You can request access to your personal information we hold',
        'Correction: You can request correction of inaccurate information',
        'Deletion: You can request deletion of your personal information',
        'Opt-out: You can opt-out of marketing communications at any time',
        'To exercise your rights, please contact us info@dwebsolution.org'
      ]
    },
    {
      id: 'changes',
      title: 'Policy Changes',
      icon: 'fas fa-edit',
      content: [
        'We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.',
        'We will notify you of significant changes by posting the new policy on this page with an updated "Last Updated" date.',
        'Your continued use of our services after changes constitutes acceptance of the updated policy.'
      ]
    }
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);

    // Capture quick navigation bottom position
    setTimeout(() => {
      const rect = this.quickNav.nativeElement.getBoundingClientRect();
      this.quickNavOffset = rect.bottom + window.scrollY;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.showBackToTop = scrollPosition > this.quickNavOffset;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}