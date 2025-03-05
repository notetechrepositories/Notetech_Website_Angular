import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, private route: Router) { }
  private getToken(): string {
    return localStorage.getItem('token') || ''; // Retrieve token dynamically
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getContactUs() {


    return this.http.post<any>(`${this.apiUrl}contact-us/admin`, {}, { headers: this.getHeaders() });
  }
  DeleteContactUs(id: string) {

    return this.http.delete<any>(`${this.apiUrl}contact-us?id=${id}`, { headers: this.getHeaders() });
  }
  UpdateContactUs(input: any) {
    var date = {
      replay_subject: input.replay_subject,
      replay: input.replay,
      contact_id: input.id
    };
    return this.http.put<any>(`${this.apiUrl}contact-us`, date, { headers: this.getHeaders() });
  }
}
