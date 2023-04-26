import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Fournisseur } from 'src/app/models/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private fournisseururl = environment.API_fournisseur


  constructor(private http:HttpClient) { }
  getAll(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.fournisseururl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.fournisseururl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.fournisseururl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.fournisseururl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.fournisseururl}${id}/`);


}
}
