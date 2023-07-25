import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Secteur } from 'src/app/models/Secteur';
import { Processus } from 'src/app/models/pocesus';
import { Site } from 'src/app/models/Site';
import { environment } from 'src/environments/environment.development';
import {Documentation} from 'src/app/models/Documentation'
import { Personnel } from 'src/app/models/Personnel';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  private API_Docs =environment.API_Docs;
  private API_Sites = environment.API_Sites;
  private API_Secteurs= environment.API_Secteurs;
  private API_Processus = environment.API_Processus;
  private API_URL_Utilisateur = environment.API_URL_Utilisateur;
 
  constructor(private http: HttpClient) { }

  
  getDocuments(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(this.API_Docs);
  }

  getDocumntById(id: number): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.API_Docs}${id}`);
  }

  addDocumentFormData(formData: FormData): Observable<Documentation> {
    return this.http.post<Documentation>(this.API_Docs, formData);
  }

  updateDocFormdata(formData: FormData): Observable<any> {
    const id = formData.get('id');
    const url = `${this.API_Docs}${id}/`;
    return this.http.put(url, formData);
  }

deleteDocument(id: number): Observable<void> {
  if (!id || isNaN(id)) {
    return throwError('Invalid ID provided.');
  }
  const url = `${this.API_Docs}${id}/`;
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
  getPersonnels(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.API_URL_Utilisateur);
  }
// pour l'affichage de fichier en tant que téléchargable
  downloadURL(id: number): Observable<Blob> {
    return this.http.get(`${this.API_Docs}/${id}`, { responseType: 'blob' });
  }
  
 
  
  
  
}
