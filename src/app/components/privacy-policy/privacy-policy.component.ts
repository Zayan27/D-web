import { Component, OnInit } from '@angular/core';
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
  lastUpdated = 'January 14, 2026';
  sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      //icon: '🔍',
      content: [
        'We collect information that you provide directly to us, including name, email address, phone number, and company information when you contact us or use our services.',
        'We automatically collect certain information about your device, including IP address, browser type, operating system, and usage data through cookies and similar technologies.'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      //icon: '⚙️',
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
      //icon: '🔒',
      content: [
        'We do not sell your personal information to third parties.',
        'We may share information with service providers who assist in our operations, subject to confidentiality agreements.',
        'We may disclose information when required by law or to protect our rights and safety.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      //icon: '🛡️',
      content: [
        'We implement industry-standard security measures to protect your information from unauthorized access, alteration, or destruction.',
        'We use encryption for data transmission and secure servers for data storage.',
        'Regular security audits and updates are performed to maintain the highest level of protection.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      //icon: '🍪',
      content: [
        'We use cookies to enhance user experience, analyze site traffic, and personalize content.',
        'You can control cookie preferences through your browser settings.',
        'Third-party analytics tools may be used to understand user behavior and improve our services.'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      //icon: '✅',
      content: [
        'Access: You can request access to your personal information we hold',
        'Correction: You can request correction of inaccurate information',
        'Deletion: You can request deletion of your personal information',
        'Opt-out: You can opt-out of marketing communications at any time'
      ]
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      //icon: '👶',
      content: [
        'Our services are not intended for children under 13 years of age.',
        'We do not knowingly collect personal information from children.',
        'If you believe we have collected information from a child, please contact us immediately.'
      ]
    },
    {
      id: 'changes',
      title: 'Policy Changes',
      //icon: '📝',
      content: [
        'We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.',
        'We will notify you of significant changes by posting the new policy on this page with an updated "Last Updated" date.',
        'Your continued use of our services after changes constitutes acceptance of the updated policy.'
      ]
    }
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
