import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly API_URL = 'https://contact-form-backend.netlify.app/.netlify/functions/sendmail';

  constructor(private http: HttpClient) {}

  sendContactEmail(formData: FormData): Observable<any> {
    return this.http.post(this.API_URL, formData);
  }
}
