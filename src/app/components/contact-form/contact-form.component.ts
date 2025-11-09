import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactComponent {
  fullname = '';
  email = '';
  project = '';
  selectedService = '';
  selectedBudget = '';
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  selectService(service: string) {
    this.selectedService = service;
  }

  selectBudget(budget: string) {
    this.selectedBudget = budget;
  }
  selectFile(file: File) {
    this.selectedFile = file;
  }
  sendEmail() {
    const payload = {
      fullname: this.fullname,
      email: this.email,
      project: this.project,
      service: this.selectedService,
      budget: this.selectedBudget,
      file: this.selectedFile ? this.selectedFile.name : null

    };

    this.http.post('https://contact-form-backend.netlify.app/.netlify/functions/sendmail', payload)
      .subscribe({
        next: (res: any) => alert(res.message),
        error: () => alert('Error sending email')
      });
  }
}
