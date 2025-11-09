import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactComponent {
  fullname = '';
  email = '';
  project = '';
  selectedService = '';
  selectedBudget = '';
  selectedFile: File | null = null;
  isSubmitting = false;
  modalVisible = false;
  modalTitle = '';
  modalMessage = '';
  modalType = '';


  constructor(private http: HttpClient) {}

  // -------------------------
  // Selection Handlers
  // -------------------------
  selectService(service: string) {
    this.selectedService = service;
  }

  selectBudget(budget: string) {
    this.selectedBudget = budget;
  }

  // -------------------------
  // File Handling
  // -------------------------
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (!file) return;

    // ✅ Limit file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size exceeds 5MB. Please choose a smaller file.');
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      return;
    }

    this.selectedFile = file;
  }

  removeSelectedFile() {
    this.selectedFile = null;
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  // -------------------------
  // Validation
  // -------------------------
  validateForm(): boolean {
    const nameRegex = /^[A-Za-z\s]{3,40}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.fullname || !this.email || !this.project) {
      this.showModal('Missing Fields', 'Please fill in all required fields.');
      return false;
    }

    if (!nameRegex.test(this.fullname)) {
      this.showModal('Invalid Name', 'Full name must contain only letters (3–40 characters).');
      return false;
    }

    if (!emailRegex.test(this.email)) {
      this.showModal('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    return true;
  }

  // -------------------------
  // Submit Form
  // -------------------------
  sendEmail() {
    if (!this.validateForm()) {
      return; // stop sending if invalid
    }
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('fullname', this.fullname);
    formData.append('email', this.email);
    formData.append('project', this.project);
    formData.append('selectedService', this.selectedService);
    formData.append('selectedBudget', this.selectedBudget);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http.post('https://contact-form-backend.netlify.app/.netlify/functions/sendmail', formData)
      .subscribe({
        next: (res: any) => {
          
          this.showModal('Success', res.message || 'Message sent successfully!', 'success');
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error(err);
          this.showModal('Error', 'There was an error sending your message.', 'error');
        }
      });
  }

  // -------------------------
  // Reset Form
  // -------------------------
  resetForm() {
    this.fullname = '';
    this.email = '';
    this.project = '';
    this.selectedService = '';
    this.selectedBudget = '';
    this.selectedFile = null;

    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  showModal(title: string, message: string, type: 'success' | 'error' = 'success') {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = type;
    this.modalVisible = true;
    setTimeout(() => this.modalVisible = false, 4000);
  }


  closeModal() {
    this.modalVisible = false;
  }
}
