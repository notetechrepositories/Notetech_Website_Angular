import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loading: boolean = true;
  loginForm !: FormGroup
  errorMessage: string = '';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  constructor(
    private fb: FormBuilder,
    private router: Router,) { }

  async ngOnInit() {


  }

  getUser() {
    return this.userSubject.value;
  }

  onLogin(): void {

  }
}

