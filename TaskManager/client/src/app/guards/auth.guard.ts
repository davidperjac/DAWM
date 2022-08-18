import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    this.authService.isAuthenticated(token).subscribe({
      error: (res: any) => {
        console.log(res);
        this.router.navigate(['login']);
        return false;
      },
      next: (res: any) => {
        return true;
      },
    });
    return true;
  }
}
