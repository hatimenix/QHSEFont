import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Qualite } from 'src/app/models/qualite';
@Injectable({
  providedIn: 'root'
})
export class QualiteService {
  private qualiteurl = environment.API_qualite


  constructor(private http:HttpClient) { }
  getAll(): Observable<Qualite[]> {
    return this.http.get<Qualite[]>(this.qualiteurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.qualiteurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.qualiteurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.qualiteurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.qualiteurl}${id}/`);


}
}
