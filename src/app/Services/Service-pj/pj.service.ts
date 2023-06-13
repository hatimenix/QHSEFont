import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pj } from 'src/app/models/pj';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PjService {

  private API_PJ =environment.API_PJ;
  constructor(private http: HttpClient) { }

   
  getPjs(): Observable<Pj[]> {
    return this.http.get<Pj[]>(this.API_PJ);
  }

  getPjById(id: number): Observable<Pj> {
    return this.http.get<Pj>(`${this.API_PJ}${id}`);
  }

  addPjFormData(formData: FormData): Observable<Pj> {
    return this.http.post<Pj>(this.API_PJ, formData);
  }

  updatePjFormdata(formData: FormData): Observable<any> {
    const id = formData.get('id');
    const url = `${this.API_PJ}${id}/`;
    return this.http.put(url, formData);
  }

  deletePj(id: number): Observable<void> {
  if (!id || isNaN(id)) {
    return throwError('Invalid ID provided.');
  }
  const url = `${this.API_PJ}${id}/`;
  return this.http.delete<void>(url);
}
}
