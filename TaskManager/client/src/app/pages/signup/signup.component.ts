import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/utils/CustomValidator';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup | any;

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      [CustomValidator.MatchValidator('password', 'confirmPassword')]
    );
  }

  register() {
    if (
      this.registerForm.this.registerForm.get('username').value !== '' &&
      this.registerForm.get('password').value !== '' &&
      this.registerForm.get('confirmPassword').value !== ''
    ) {
      this.authService
        .register(
          this.registerForm.get('username').value,
          this.registerForm.get('password').value
        )
        .subscribe({
          error: (res) => {
            this.toastr.error(res.error);
          },
          next: (res) => {
            this.route.navigate(['/login']);
            this.toastr.success('User created successfully');
          },
        });
    }
  }

  ngOnInit(): void {}
}
