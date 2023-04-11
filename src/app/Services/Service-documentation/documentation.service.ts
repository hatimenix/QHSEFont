import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documentation } from 'src/app/models/Documentation';
import { Processus } from 'src/app/models/pocesus';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  private API_Processus =environment.API_Processus;
  private API_docs =environment.API_Docs;

  constructor(private http: HttpClient) { }

  getDocument(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(this.API_docs);
  }
  getDocumentById(id: number): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.API_docs}${id}`);
  }
  addDocument(document: Documentation): Observable<Documentation> {
    return this.http.post<Documentation>(this.API_docs, document);
  }
  updateDocument(id: number, document: Documentation): Observable<Documentation> {
    const url = `${this.API_docs}${id}/`;
    return this.http.put<Documentation>(url, document);
  }
  deleteDocument(id: number): Observable<void> {
    const url = `${this.API_docs}${id}`;
    return this.http.delete<void>(url);
  }
  
  getProcessusList(): Observable<Processus[]> {
    return this.http.get<Processus[]>(this.API_Processus);
  }
  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(`${this.API_docs}/${id}`, { responseType: 'blob' });
  }
}
