import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Traitement } from 'src/app/models/traitement';

@Injectable({
  providedIn: 'root'
})
export class ServiceRegistreTraitementService {
  
  private traitementurl = environment.API_registre_de_traitement;


  constructor(private http:HttpClient) { }
  getAll(): Observable<Traitement[]> {
    return this.http.get<Traitement[]>(this.traitementurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.traitementurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.traitementurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.traitementurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.traitementurl}${id}/`);


}
}