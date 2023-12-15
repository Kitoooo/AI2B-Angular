import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthToken } from './auth-token';
import { AuthResponse } from './auth-response';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  public isAdmin(): boolean {
    const token: AuthToken = this.jwtHelper.decodeToken() as AuthToken;
    if (this.isAuthenticated()) {
      return token && token.roles.includes('ADMIN');
    }
    return false;
  }

  public login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('https://labjwt.zecer.wi.zut.edu.pl/api/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          console.debug('login() response', response);
          if (response.token) {
            localStorage.setItem('access_token', response.token);
          } else {
            localStorage.removeItem('access_token');
          }
        })
      );
  }

  public getUsername(): string | null  {
    const token: AuthToken = this.jwtHelper.decodeToken() as AuthToken;
    return token?.sub;
  }
  public logout(): void {
    localStorage.removeItem('access_token');
  }
}
