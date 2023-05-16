import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Realisations } from 'src/app/models/realisations';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiRealisationService {

  API_URL_RE = environment.API_URL_RE

  constructor(private http:HttpClient) { }

  getAllRealisations(): Observable<Realisations[]> {
    return this.http.get<Realisations[]>(this.API_URL_RE);
  }

  getRealisations(id: number): Observable<Realisations> {
    const url = `${this.API_URL_RE}${id}/`;
    return this.http.get<Realisations>(url);
  }

  getRealisationByActionId(ationId: number): Observable<Realisations[]> {
    return this.http.get<Realisations[]>(`${this.API_URL_RE}?action_associe=${ationId}`).pipe(
      map((realisations: Realisations[]) => {
        return realisations.filter(r => r.action_associe === ationId);
      })
    );
  }

  addRealisation(realisation: any): Observable<Realisations> {
    return this.http.post<Realisations>(this.API_URL_RE, realisation);
  }

  delRealisation(id:number){
    return this.http.delete<Realisations>(this.API_URL_RE+id+'/');
  }
}
