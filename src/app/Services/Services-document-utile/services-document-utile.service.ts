import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DocumentsUtiles } from 'src/app/models/documents-utiles';

@Injectable({
  providedIn: 'root'
})
export class ServiceDocumentUtilesService {
  
  private documents_utilesurl = environment.API_documents_utiles;


  constructor(private http:HttpClient) { }
  getAll(): Observable<DocumentsUtiles[]> {
    return this.http.get<DocumentsUtiles[]>(this.documents_utilesurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.documents_utilesurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.documents_utilesurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.documents_utilesurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.documents_utilesurl}${id}/`);


}
downloadFile(document: any): void {
  this.http.get(document, { responseType: 'blob' }).subscribe((fileBlob: Blob) => {
    const fileUrl = URL.createObjectURL(fileBlob);
    window.open(fileUrl);
  });
}

}