import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesures } from 'src/app/models/mesures';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiMesuresService {

  API_URL_ME = environment.API_URL_ME

  constructor(private http:HttpClient) { }

  getAllMesures(): Observable<Mesures[]> {
    return this.http.get<Mesures[]>(this.API_URL_ME);
  }

  getMesure(id: number): Observable<Mesures> {
    const url = `${this.API_URL_ME}${id}/`;
    return this.http.get<Mesures>(url);
  }

  addMesure(mesure: any): Observable<Mesures> {
    return this.http.post<Mesures>(this.API_URL_ME, mesure);
  }

  delMesure(id:number){
    return this.http.delete<Mesures>(this.API_URL_ME+id+'/');
  }

}
