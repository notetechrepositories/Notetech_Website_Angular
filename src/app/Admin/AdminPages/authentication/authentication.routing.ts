import { Routes } from '@angular/router';
import { AppSideLoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'login',
    component: AppSideLoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'verify-otp',
    component: VerifyOtpComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  }
];
