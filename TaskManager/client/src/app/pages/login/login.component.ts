import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(
    private route: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.authService
      .login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      )
      .subscribe({
        error: (res: any) => {
          this.toastr.error(res.error);
        },
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.route.navigate([`/boards/${res.user[0].userId}`]);
        },
      });
  }

  ngOnInit(): void {}
}
