import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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

  
  getDocuments(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(this.API_Docs);
  }

  getDocumntById(id: number): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.API_Docs}${id}`);
  }


  addDocument(doc: Documentation): Observable<Documentation> {
    const formData = new FormData();
    formData.append('nom', doc.nom);
    formData.append('codification', doc.codification);
    formData.append('version', String(doc.version));
    formData.append('date_approbation', String(doc.date_approbation));
    formData.append('date_previsionnelle', String(doc.date_previsionnelle));
    formData.append('nv_version',String(doc.nv_version));
    formData.append('type_docs', doc.type_docs);
   
    if (doc.url_document) {
      formData.append('url_document', doc.url_document, doc.url_document.name);
    }
    return this.http.post<Documentation>(this.API_Docs, formData).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
  addDocumentFormData(formData: FormData): Observable<Documentation> {
    return this.http.post<Documentation>(this.API_Docs, formData);
  }

  

  updateDocument(doc: Documentation): Observable<Documentation> {
    return this.http.put<Documentation>(`${this.API_Docs}${doc.id}/`, doc);
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

  downloadURL(id: number): Observable<Blob> {
    return this.http.get(`${this.API_Docs}/${id}`, { responseType: 'blob' });
  }
}
