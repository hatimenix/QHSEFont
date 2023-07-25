import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private API_URL_SERVICE = environment.API_URL_SERVICE

  constructor(private http:HttpClient) { }

  
  getAllService(): Observable<Service[]> {
    return this.http.get<Service[]>(this.API_URL_SERVICE);
  }

  getService(id: number): Observable<Service> {
    const url = `${this.API_URL_SERVICE}${id}/`;
    return this.http.get<Service>(url);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.API_URL_SERVICE, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.API_URL_SERVICE}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL_SERVICE}${id}/`);


  }
}
