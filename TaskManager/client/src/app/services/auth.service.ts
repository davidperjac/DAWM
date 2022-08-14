import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL: string = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post(this.URL + '/register', {
      username: username,
      password: password,
    });
  }

  login() {}
}
