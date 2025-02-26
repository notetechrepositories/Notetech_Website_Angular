import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

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
}
