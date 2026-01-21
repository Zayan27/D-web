import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refund-policy.component.html',
  styleUrls: ['./refund-policy.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RefundPolicyComponent implements OnInit {
  @ViewChild('quickNav', { static: true }) quickNav!: ElementRef;
  showBackToTop = false;
  quickNavOffset = 0;
  lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  sections = [
    {
      id: 'project-based-refunds',
      title: 'Project-Based Refunds',
      icon: 'fas fa-project-diagram',
      content: [
        'All payments made to DWebSolutions are for professional time and services. Therefore, advance payments are non-refundable once the project has started.',
        'Refunds are not provided for change of mind, delays caused by the client, or incomplete delivery of required materials.'
      ]
    },
    {
      id: 'service-satisfaction',
      title: 'Service Satisfaction',
      icon: 'fas fa-smile',
      content: [
        'We ensure the client receives the agreed-upon work through regular updates and revisions included in their package.',
        'If the client is dissatisfied, we will make reasonable adjustments within the scope of the project, but this does not qualify for a refund.'
      ]
    },
    {
      id: 'cancellation-by-client',
      title: 'Cancellation by Client',
      icon: 'fas fa-user-times',
      content: [
        'If a project is canceled by the client at any stage, payment for all completed work must still be made.',
        'Any partially completed deliverables will be shared only after the due amount is cleared.'
      ]
    },
    {
      id: 'cancellation-by-dweb',
      title: 'Cancellation by DWebSolutions',
      icon: 'fas fa-undo-alt',
      content: [
        'In rare cases where DWebSolutions must cancel a project due to operational reasons, the client will be refunded for any incomplete portion of the project.'
      ]
    },
    {
      id: 'third-party-payments',
      title: 'Third-Party Payments',
      icon: 'fas fa-external-link-alt',
      content: [
        'Fees paid for domains, hosting, plugins, software licenses, payment gateways, or ads are non-refundable under all circumstances.',
        'These are third-party services that have their own refund policies separate from DWebSolutions.'
      ]
    }
  ];

  importantNotes = [
    {
      icon: 'fas fa-exclamation-triangle',
      title: 'No Refunds After Project Start',
      description: 'Once work has commenced, advance payments cannot be refunded.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Fair Service Guarantee',
      description: 'We commit to delivering quality work with revisions within project scope.'
    },
    {
      icon: 'fas fa-file-invoice-dollar',
      title: 'Payment for Completed Work',
      description: 'Cancellations require payment for all work completed up to that point.'
    }
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);
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