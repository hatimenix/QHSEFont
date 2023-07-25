import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArretTravail } from 'src/app/models/arret-travail';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiArretTravailService {

  API_URL_AT = environment.API_URL_AT;

  constructor(private http:HttpClient) { }

  getAllArretTravail(): Observable<ArretTravail[]> {
    return this.http.get<ArretTravail[]>(this.API_URL_AT);
  }

  delArret(id:number){
    return this.http.delete<ArretTravail>(this.API_URL_AT+id+'/');
  }

  updateArret(id: number, arret: ArretTravail): Observable<ArretTravail> {
    const url = `${this.API_URL_AT}${id}/`;
    return this.http.put<ArretTravail>(url, arret);
  }

  updateArretFormdata(idArret: number, formData: FormData): Observable<any> {
    const url = `${this.API_URL_AT}${idArret}/`;
    return this.http.put(url, formData);
  }

  getArretByEvenementId(EvenementId: number): Observable<ArretTravail[]> {
    return this.http.get<ArretTravail[]>(`${this.API_URL_AT}?evenement=${EvenementId}`).pipe(
      map((arrteTravail: ArretTravail[]) => {
        return arrteTravail.filter(a => a.evenement === EvenementId);
      })
    );
  }

}
