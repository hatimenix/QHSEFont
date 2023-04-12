import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilsateur } from 'src/app/models/utilsateur';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiUtilisateurService {

  private utilisateurUrl = environment.API_URL_Utilisateur

  constructor(private http:HttpClient) { }

  getAllUtilsateur(): Observable<Utilsateur[]> {
    return this.http.get<Utilsateur[]>(this.utilisateurUrl);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.utilisateurUrl, data);
  }
}