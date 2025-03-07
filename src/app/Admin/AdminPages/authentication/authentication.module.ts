import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AuthenticationRoutes } from './authentication.routing';
import { AppSideLoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [
    AppSideLoginComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    ResetPasswordComponent
  ],
})
export class AuthenticationModule { }
