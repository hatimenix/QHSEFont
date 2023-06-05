import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TypePartie } from 'src/app/models/typepartie';
@Injectable({
  providedIn: 'root'
})
export class TypepartieService {
  private typepartieurl = environment.API_typepartie


  constructor(private http:HttpClient) { }
  getAll(): Observable<TypePartie[]> {
    return this.http.get<TypePartie[]>(this.typepartieurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.typepartieurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.typepartieurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.typepartieurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.typepartieurl}${id}/`);


}
}
