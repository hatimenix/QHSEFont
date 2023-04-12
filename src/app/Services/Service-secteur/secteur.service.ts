import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Secteur } from 'src/app/models/Secteur';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  private API_Secteurs =environment.API_Secteurs;
  private API_Docs = environment.API_Docs;
  constructor(private http: HttpClient) { }

  getSecteur(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(this.API_Secteurs);
  }

  
  getSecteurById(id: number): Observable<Secteur> {
    return this.http.get<Secteur>(`${this.API_Secteurs}${id}`);
  }

  
  addSecteur(secteur: Secteur): Observable<Secteur> {
    return this.http.post<Secteur>(this.API_Secteurs, secteur);
  }
  

  updateSecteur(id: number, secteur: Secteur): Observable<Secteur> {
    const url = `${this.API_Secteurs}${id}/`;
    return this.http.put<Secteur>(url, secteur);
  }
  deleteSecteur(id: number): Observable<void> {
    const url = `${this.API_Secteurs}${id}`;
    return this.http.delete<void>(url);
  }
  getDocumentList(): Observable<Document[]> {
    return this.http.get<Document[]>(this.API_Docs);
  }
}
