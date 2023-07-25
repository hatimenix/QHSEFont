import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dangers } from 'src/app/models/dangers';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiDangerService {

  private API_URL_DANGER = environment.API_URL_DANGER

  constructor(private http:HttpClient) { }

  getAllDanger(){
    return this.http.get<Dangers[]>(this.API_URL_DANGER);
  }

  delDanger(id:number){
    return this.http.delete<Dangers>(this.API_URL_DANGER+id+'/');
  }

  getDanger(id: number): Observable<Dangers> {
    const url = `${this.API_URL_DANGER}${id}/`;
    return this.http.get<Dangers>(url);
  }

  addDanger(danger: Dangers): Observable<Dangers> {
    return this.http.post<Dangers>(this.API_URL_DANGER, danger);
  }

  updateDanger(id: number, danger: Dangers): Observable<Dangers> {
    const url = `${this.API_URL_DANGER}${id}/`;
    return this.http.put<Dangers>(url, danger);
  }
}
