import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/models/Personnel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private API_User =environment.API_User;

  constructor(private http: HttpClient) { }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.API_User);
  }

  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.API_User, utilisateur);
  }

  updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    const apiUrl = `${this.API_User}${utilisateur.id}/`;
    return this.http.put<Utilisateur>(apiUrl, utilisateur);
  }

  deleteUtilisateur(id: number): Observable<{}> {
    const apiUrl = `${this.API_User}${id}/`;
    return this.http.delete(apiUrl);
  }
}
