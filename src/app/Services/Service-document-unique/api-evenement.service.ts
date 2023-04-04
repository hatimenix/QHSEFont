import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/app/models/evenement';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiEvenementService {

  API_URL_EV = environment.API_URL_EV

  constructor(private http:HttpClient) { }

  getAllEvenement(){
    return this.http.get<Evenement>(this.API_URL_EV);
  }

  getEvenement(id: number): Observable<Evenement> {
    const url = `${this.API_URL_EV}${id}/`;
    return this.http.get<Evenement>(url);
  }
}
