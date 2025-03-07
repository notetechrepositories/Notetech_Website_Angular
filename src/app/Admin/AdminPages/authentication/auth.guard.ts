import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../Services/Admin/auth/auth.service';

@Injectable({
  providedIn: 'root' // ✅ Ensure it's available globally
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/authentication/login']); // ✅ Redirect to login if not authenticated
      return false;
    }
  }
}
