// import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL: string = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  register(username: string, password: string) {
    return this.http.post(this.URL + '/register', {
      username: username,
      password: password,
    });
  }

  login(username: string, password: string) {
    return this.http.post(this.URL + '/login', {
      username: username,
      password: password,
    });
  }

  getUser(id: string) {
    return this.http.get(this.URL + `/${id}`);
  }
}
