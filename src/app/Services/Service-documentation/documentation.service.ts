import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Secteur } from 'src/app/models/Secteur';
import { Processus } from 'src/app/models/pocesus';
import { Site } from 'src/app/models/site';
import { environment } from 'src/environments/environment.development';
import {Documentation} from 'src/app/models/Documentation'

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  private API_Docs =environment.API_Docs;
  private API_Sites = environment.API_Sites;
  private API_Secteurs= environment.API_Secteurs;
  private API_Processus = environment.API_Processus;
 
  constructor(private http: HttpClient) { }

  getDocument(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(this.API_Docs);
  }

  
  getDocumentById(id: number): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.API_Docs}${id}`);
  }

  
  addDocument(documents: Documentation): Observable<Documentation> {
    return this.http.post<Documentation>(this.API_Docs, documents);
  }
  

  
  updateDocument(id: number, documents: Documentation): Observable<Documentation> {
    const url = `${this.API_Docs}${id}/`;
    return this.http.put<Documentation>(url, documents);
  }

  deleteDocument(id: number): Observable<void> {
    const url = `${this.API_Docs}${id}`;
    return this.http.delete<void>(url);
  }
  //la liste des autres components utilisé
  getSiteList(): Observable<Site[]> {
    return this.http.get<Site[]>(this.API_Sites);
  }
  getSecteurList(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(this.API_Secteurs);
  }
  getProcessusList(): Observable<Processus[]> {
    return this.http.get<Processus[]>(this.API_Processus);
  }
}
