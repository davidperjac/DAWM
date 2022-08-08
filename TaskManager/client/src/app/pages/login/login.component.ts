import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: String = 'allan@espol.edu.ec';
  username: String = 'Allan';
  password: String = 'dawm';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  onSubmit() {
    if (
      this.emailFormControl.value === this.email &&
      this.passwordFormControl.value === this.password
    ) {
      this.route.navigate([`/boards/${this.username}`]);
    }
  }

  constructor(private route: Router) {}

  ngOnInit(): void {}
}
