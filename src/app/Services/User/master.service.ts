import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, private route: Router) { }


  getHeaderAndFooter() {

    return this.http.get<any>(`${this.apiUrl}home/header-and-footer`);
  }
  getContent() {

    return this.http.get<any>(`${this.apiUrl}home/content`);
  }
  getPage(id: string | null) {

    return this.http.get<any>(`${this.apiUrl}home/page-by-id?page_id=${id}`);
  }
  getContactUs() {

    return this.http.get<any>(`${this.apiUrl}contact-us`);
  }
  insertContactUs(input: any) {
    console.log(input);

    return this.http.post<any>(`${this.apiUrl}contact-us`, input);
  }
}
