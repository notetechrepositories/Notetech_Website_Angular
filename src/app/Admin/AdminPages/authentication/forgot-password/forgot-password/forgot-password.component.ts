import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../Services/Admin/auth/auth.service';
import { EncryptionService } from '../../../../../Services/utilities/encryption.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  loading: boolean = true;
  forgotPasswordForm!: FormGroup;
  isPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private encryptService: EncryptionService) {

  }
  ngOnInit(): void {
    this.initialise();
  }
  initialise() {

    const isLoggedIn = this.authService.isLoggedIn(); // Check login status first


    if (isLoggedIn) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
      return; // Prevent further execution
    }

    this.forgotPasswordForm = this.fb.group({
      contact: ['', [Validators.required, Validators.pattern(
        /^((\+)?(\d{1,3})[- ]?)?(\d{10})$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Regex for phone or email
      )]]
    })
    this.loading = false;

  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.isPassword = !this.isPassword;
  }

  // Handle OTP submission
  async sendOtp(): Promise<void> {
    if (this.forgotPasswordForm.valid) {
      const usernameassign = this.forgotPasswordForm.get('contact')?.value;



      this.authService.ForgotPassword(usernameassign).subscribe({
        next: async (res) => {
          console.log("returned from forgotpassword");

          if (res.status == 200) {
            console.log(res.status);
            var input = {
              user: res.data,
              email: usernameassign
            }
            var jsonString = JSON.stringify(input);;
            const data = await this.encryptService.encryptData(jsonString);
            this.router.navigate(['authentication/verify-otp'], { queryParams: { data }, });




          }
          else {
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

            this.router.navigate(['/authentication/forgot-password']);
          }
        },
        error: (error) => {
          alert('Somthing is wrong.');

        }
      });



    }
  }

}
