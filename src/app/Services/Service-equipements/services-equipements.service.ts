import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Equipement } from 'src/app/models/equipement';
@Injectable({
  providedIn: 'root'
})
export class ServicesEquipementservice{
  private equipementurl = environment.API_equipement


  constructor(private http:HttpClient) { }
  getAll(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.equipementurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.equipementurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.equipementurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.equipementurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.equipementurl}${id}/`);


}
downloadPiece(id: number): Observable<Blob> {
  return this.http.get(`${this.equipementurl}/${id}`, { responseType: 'blob' });
}



}
