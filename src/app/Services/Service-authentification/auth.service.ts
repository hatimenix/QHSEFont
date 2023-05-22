import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_Login =environment.API_Login;

  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private http: HttpClient) {}

  login(adresse_email: string, password: string) {
    const loginData = { adresse_email, password };
    return this.http.post<any>(`${this.API_Login}`, loginData);
  }

  saveTokens(tokens: { access: string, refresh: string }) {
    localStorage.setItem(this.accessTokenKey, tokens.access);
    localStorage.setItem(this.refreshTokenKey, tokens.refresh);
  }

  getAccessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }
  isAuthenticated():boolean{
    const accessToken = this.getAccessToken();
    return !!accessToken;
  }

}
