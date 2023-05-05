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

  delAnalyse(id:number){
    return this.http.delete<Analyses>(this.API_URL_AE+id+'/');
  }

  addAnalyseFormData(formData: FormData): Observable<Analyses> {
    return this.http.post<Analyses>(this.API_URL_AE, formData);
  }

  updateAnalyse(id: number, analyse: Analyses): Observable<Analyses> {
    const url = `${this.API_URL_AE}${id}/`;
    return this.http.put<Analyses>(url, analyse);
  }

  updateAnalyseFormdata(idAnalyse: number, formData: FormData): Observable<any> {
    const url = `${this.API_URL_AE}${idAnalyse}/`;
    return this.http.put(url, formData);
  }
}
