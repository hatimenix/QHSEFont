import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analyses } from 'src/app/models/analyses';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiAnalyseEvenementService {

  API_URL_AE = environment.API_URL_AE

  constructor(private http:HttpClient) { }

  getAllAnalyseEvenement(): Observable<Analyses[]> {
    return this.http.get<Analyses[]>(this.API_URL_AE);
  }

  getAnalyseEvenement(id: number): Observable<Analyses> {
    const url = `${this.API_URL_AE}${id}/`;
    return this.http.get<Analyses>(url);
  }
}
