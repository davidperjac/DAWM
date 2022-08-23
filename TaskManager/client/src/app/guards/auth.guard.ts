import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  canActivate() {
    const token = localStorage.getItem('token')!;

    this.authService.isAuthenticated(token).subscribe({
      error: (res) => {
        this.toastr.error(res.error);
        this.router.navigate(['/login']);
        return false;
      },
      next: (res) => {
        return true;
      },
    });
    return true;
  }
}
