import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { catchError, from, mergeMap, Observable, throwError } from 'rxjs';
import { TokenService } from '../../utilities/token.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, private route: Router, private tokenService: TokenService) { }
  private async getHeaders(): Promise<HttpHeaders> {
    try {
      const token = await this.tokenService.getToken();

      if (!token) {
        localStorage.clear();

        this.route.navigate(['/authentication/login'])
      }

      var status = this.tokenService.isTokenExpired(token)



      if (status) {
        localStorage.clear();

        this.route.navigate(['/authentication/login'])
      }

      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }



  getContactUs(): Observable<any> {

    return from(this.getHeaders()).pipe(
      mergeMap(headers => {
        return this.http.post<any>(`${this.apiUrl}contact-us/admin`, {}, { headers })

      }),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error("Failed to generate headers."));
      })
    );
  }
  DeleteContactUs(id: string): Observable<any> {
    return from(this.getHeaders()).pipe(
      mergeMap(headers => {
        return this.http.delete<any>(`${this.apiUrl}contact-us?id=${id}`, { headers })

      }),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error("Failed to generate headers."));
      })
    );

  }
  UpdateContactUs(input: any): Observable<any> {
    var date = {
      replay_subject: input.replay_subject,
      replay: input.replay,
      contact_id: input.id
    };
    return from(this.getHeaders()).pipe(
      mergeMap(headers => {
        return this.http.put<any>(`${this.apiUrl}contact-us`, date, { headers })

      }),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error("Failed to generate headers."));
      })
    );



  }
}
