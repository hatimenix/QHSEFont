import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exigences } from 'src/app/models/exigences';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExigencesService {
  private exigencesurl = environment.API_exigences

  constructor(private http:HttpClient) { }

  getAllExigences(): Observable<Exigences[]> {
    return this.http.get<Exigences[]>(this.exigencesurl);
  }

  getExigences(id: number): Observable<Exigences> {
    const url = `${this.exigencesurl}${id}/`;
    return this.http.get<Exigences>(url);
  }

  addExigence(exigence: any): Observable<Exigences> {
    return this.http.post<Exigences>(this.exigencesurl, exigence);
  }

  addExigenceFormData(formData: FormData): Observable<Exigences> {
    return this.http.post<Exigences>(this.exigencesurl, formData);
  }

  delExigence(id:number){
    return this.http.delete<Exigences>(this.exigencesurl+id+'/');
  }
  updateExigenceFormdata(idExigence: number, formData: FormData): Observable<any> {
    const url = `${this.exigencesurl}${idExigence}/`;
    return this.http.put(url, formData);
  }
}
