import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taches } from 'src/app/models/taches';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiTachesService {

  API_URL_TA = environment.API_URL_TA

  constructor(private http:HttpClient) { }

  getAllTaches(): Observable<Taches[]> {
    return this.http.get<Taches[]>(this.API_URL_TA);
  }

  getTaches(id: number): Observable<Taches> {
    const url = `${this.API_URL_TA}${id}/`;
    return this.http.get<Taches>(url);
  }

  addTache(action: any): Observable<Taches> {
    return this.http.post<Taches>(this.API_URL_TA, action);
  }

  delTache(id:number){
    return this.http.delete<Taches>(this.API_URL_TA+id+'/');
  }
}
