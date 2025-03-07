import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/Admin/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnDestroy{

  resetPasswordForm!: FormGroup;
  loading:boolean=true;
  userDetails!:string;
  isPasswordVisible: boolean=false;
  isConfirmPasswordVisible: boolean=false;
  interval!: any;
  timer: number = 120; // 2 minutes in seconds
  
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute
    
  ){}
  ngOnInit(){
    this.initialise();
  }

  async initialise(){

    const isLoggedIn = await this.authService.isLoggedIn(); // Check login status first

    if (isLoggedIn) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
      return; // Prevent further execution
    }
    this.route.queryParams.subscribe((params) => {
      this.userDetails = params['data'];
    });

    if (!this.userDetails) {
      this.router.navigate(['/authentication/login']);
      return;
    }
    this.loading = false;
    this.startTimer();
    this.resetPasswordForm=this.fb.group({
      password:['',[Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)]],
      confirmPassword:['',[Validators.required]]
    },
    { validators: this.passwordsMatch }
  );
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.redirectToLogin();
      }
    }, 1000);
  }

  // Redirect to login page
  redirectToLogin(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Session expired! Redirecting to the login page.',
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      background: '#f44336',
      color: 'white',
      padding: '10px',
      showCloseButton: true,
    });

    this.router.navigate(['/authentication/login']);
  }

  private passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

   // Handle form submission
   onResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const password = this.resetPasswordForm.value;


      this.authService.resetPassword(this.userDetails, password.password).subscribe({
        next: (res) => {
          if (res.status === 200) {
            console.log(res);
            
            this.router.navigate(['/authentication/login']);
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
          }
        },
        error: (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Somthing is wrong.',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            background: '#f44336',
            color: 'white',
            padding: '10px',
            showCloseButton: true,
          });
        },
      });
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
