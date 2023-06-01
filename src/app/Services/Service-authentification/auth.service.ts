import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserApp } from 'src/app/models/UserApp';
import { environment } from 'src/environments/environment.development';
import { PermissionService } from '../Service-permission/permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_Login = environment.API_Login;
  private API_UsersApp = environment.API_UsersApp;
  private API_Details_User = environment.API_Details_User;
  user: UserApp | null = null;
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private permissionService: PermissionService
  ) {}

  login(email: string, password: string) {
    const loginData = { email, password };
    return this.http.post<any>(`${this.API_Login}`, loginData);
  }

  saveTokens(tokens: { access: string; refresh: string }) {
    localStorage.setItem(this.accessTokenKey, tokens.access);
    localStorage.setItem(this.refreshTokenKey, tokens.refresh);
  }

  getAccessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    return !!accessToken;
  }

  getUser(): Observable<any> {
    const accessToken = this.getAccessToken();

    console.log("Access Token:", accessToken);

    return this.http.get<any>(`${this.API_UsersApp}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).pipe(
      tap((user: any) => {
        console.log("User Response:", user);
        this.user = user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);

    this.user = null;

    this.router.navigate(['/']);
  }

  getUserDetails(): Observable<any> {
    const accessToken = this.getAccessToken();
    return this.http.get<any>(this.API_Details_User, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
