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

  getAllEvenement(): Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.API_URL_EV);
  }

  getEvenement(id: number): Observable<Evenement> {
    const url = `${this.API_URL_EV}${id}/`;
    return this.http.get<Evenement>(url);
  }

  delEvenement(id:number){
    return this.http.delete<Evenement>(this.API_URL_EV+id+'/');
  }

  addEvenement(evenement: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(this.API_URL_EV, evenement);
  }

  addevenementFormData(formData: FormData): Observable<Evenement> {
    return this.http.post<Evenement>(this.API_URL_EV, formData);
  }

  updateEvenementFormdata(idEvenement: number, formData: FormData): Observable<any> {
    const url = `${this.API_URL_EV}${idEvenement}/`;
    return this.http.put(url, formData);
  }

}
