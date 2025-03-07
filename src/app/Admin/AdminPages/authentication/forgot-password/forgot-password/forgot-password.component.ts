import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../Services/Admin/auth/auth.service';
import { EncryptionService } from '../../../../../Services/utilities/encryption.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{

  loading: boolean=true;
  forgotPasswordForm!:FormGroup;
  isPassword = false;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private encryptService: EncryptionService){

  }
  ngOnInit(): void {
    this.initialise();
  }
  initialise(){

    const isLoggedIn =  this.authService.isLoggedIn(); // Check login status first


    if (isLoggedIn) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
      return; // Prevent further execution
    }

    this.forgotPasswordForm = this.fb.group({
      contact:['',[Validators.required,Validators.pattern(
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

      
      const data = await this.encryptService.encryptData(usernameassign);

      
      this.router.navigate(['authentication/verify-otp'], {queryParams: {data},});
      console.log(data);
      
    }
  }
  
}
