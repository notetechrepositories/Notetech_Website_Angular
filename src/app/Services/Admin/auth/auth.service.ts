import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../utilities/token.service';
import { environment } from '../../../environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl;

  constructor(private http:HttpClient,
    private tokenService: TokenService,
    private router: Router) {}

  isLoggedIn(): boolean {

    const token = localStorage.getItem('token');
    return !!token;  // Check if token exists
  }

  adminLogin(username: string, password: string): Observable<any> {

    console.log(this.apiUrl);

    const loginPayload = { username, password };
    console.log("loginPayload", loginPayload);
    return this.http.post<any>(`${this.apiUrl}auth/login`, loginPayload);
  }
  
  // Function to handle the login logic (subscribing to the observable)
  handleLogin(username: string, password: string) {
    return this.adminLogin(username, password).subscribe({
      next: async (res) => {
        if (res.status === 200) {
          await this.tokenService.storeToken(res.data); // Store token
          this.router.navigate(['/admin/dashboard']); // Navigate to the dashboard
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            background: '#f44336',
            color: 'white',
            padding: '10px',
            showCloseButton: true,
          });
        }
      },
      error: (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something is Wrong..',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
          background: '#f44336',
          color: 'white',
          padding: '10px',
          showCloseButton: true,
        });
      }
    });
  }

  ForgotPassword(username: string): Observable<any> {
    console.log("entered into forgotpassword");
    
    var data = null;
    var url = this.apiUrl + "auth/forgot-password?username=" + username
    console.log(url);

    var status = this.http.post<any>(url, data);
    console.log(status);

    return status;

  }

  varifyOtp(otp: string, encrypted_data: string): Observable<any> {
    const varifyPayload = {
      otp,  // Matching the expected payload from the image
      encrypted_data,
    };
    return this.http.post<any>(`${this.apiUrl}auth/verify-otp`, varifyPayload);

  }

  resetPassword(user_id: string, password: string): Observable<any> {
    const restPayload = {
      user_id,
      password,
    };

    return this.http.post<any>(`${this.apiUrl}auth/reset-password`, restPayload);

  }
}
