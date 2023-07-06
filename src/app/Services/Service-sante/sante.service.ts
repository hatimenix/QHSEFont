import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Sante } from 'src/app/models/sante';
@Injectable({
  providedIn: 'root'
})
export class SanteService {
  private santeurl = environment.API_sante


  constructor(private http:HttpClient) { }
  getAll(): Observable<Sante[]> {
    return this.http.get<Sante[]>(this.santeurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.santeurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.santeurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.santeurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.santeurl}${id}/`);


}
}
