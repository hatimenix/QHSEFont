import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Partie } from 'src/app/models/partie';
@Injectable({
  providedIn: 'root'
})
export class PartieService {
  private partieurl = environment.API_partie


  constructor(private http:HttpClient) { }
  getAll(): Observable<Partie[]> {
    return this.http.get<Partie[]>(this.partieurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.partieurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.partieurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.partieurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.partieurl}${id}/`);


}
}
