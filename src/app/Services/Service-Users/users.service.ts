import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserApp } from 'src/app/models/UserApp';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_UsersApp =environment.API_UsersApp;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserApp[]> {
    return this.http.get<UserApp[]>(this.API_UsersApp);
  }

  getUserById(id: number): Observable<UserApp> {
    const url = `${this.API_UsersApp}${id}`;
    return this.http.get<UserApp>(url);
  }

  createUserApp(userApp: UserApp): Observable<UserApp> {
    return this.http.post<UserApp>(this.API_UsersApp, userApp);
  }

  updateUserApp(id: number, userApp: UserApp): Observable<UserApp> {
    const url = `${this.API_UsersApp}${id}/`;
    return this.http.put<UserApp>(url, userApp);
  }

  deleteUserApp(id: number): Observable<void> {
    const url = `${this.API_UsersApp}${id}`;
    return this.http.delete<void>(url);
  }

}
