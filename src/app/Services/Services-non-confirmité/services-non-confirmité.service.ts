import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Nc } from 'src/app/models/nc';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ServicesNonConfirmitéService {
  private ncurl = environment.API_nc


  constructor(private http:HttpClient) { }
  getAll(): Observable<Nc[]> {
    return this.http.get<Nc[]>(this.ncurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.ncurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.ncurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.ncurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.ncurl}${id}/`);


}
downloadPiece(id: number): Observable<Blob> {
  return this.http.get(`${this.ncurl}/${id}`, { responseType: 'blob' });
}



}
