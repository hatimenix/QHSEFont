import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FamilleDanger } from 'src/app/models/famille-danger';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FamilleDangerService {

  API_URL_FD = environment.API_URL_FD

  constructor(private http:HttpClient) { }

  getAllFamille(): Observable<FamilleDanger[]> {
    return this.http.get<FamilleDanger[]>(this.API_URL_FD);
  }

  addFamille(famille: any): Observable<FamilleDanger> {
    return this.http.post<FamilleDanger>(this.API_URL_FD, famille);
  }

  delFamille(id:number){
    return this.http.delete<FamilleDanger>(this.API_URL_FD+id+'/');
  }

  updateFamille(id: number, famille: FamilleDanger): Observable<FamilleDanger> {
    const url = `${this.API_URL_FD}${id}/`;
    return this.http.put<FamilleDanger>(url, famille);
  }

}

