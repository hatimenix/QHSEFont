import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Secteur } from 'src/app/models/Secteur';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  private secteururl =environment.API_Secteurs;
 
  constructor(private http:HttpClient) { }
  getAll(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(this.secteururl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.secteururl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.secteururl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.secteururl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.secteururl}${id}/`);


}
getSecteur(): Observable<Secteur[]> {
  return this.http.get<Secteur[]>(this.secteururl);
}
}
