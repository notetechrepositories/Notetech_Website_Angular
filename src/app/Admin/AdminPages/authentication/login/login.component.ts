import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/Admin/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {



  constructor(
    private router: Router,
    private fb:FormBuilder, 
    private authService: AuthService,
    ) { }

  loginForm!: FormGroup;
  loading: boolean= true;
  // private userSubject = new BehaviorSubject<any>(null);
  async ngOnInit() {
    this.initialise();

  }

  initialise(){
    const isLoggedIn = this.authService.isLoggedIn(); // Check login status first
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
      return; // Prevent further execution
    }
    this.loginForm=this.fb.group({
      username:['',[Validators.required]],
      password:['',Validators.required]
    })
    this.loading = false;
  }

  // getUser() {
  //   return this.userSubject.value;
  // }
  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      this.authService.handleLogin(username, password); // Call handleLogin() from the service
    }
  }
}

