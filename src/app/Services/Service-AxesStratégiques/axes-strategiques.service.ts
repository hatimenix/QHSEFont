import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AxesStrategiques } from 'src/app/models/axes-strategiques';
@Injectable({
  providedIn: 'root'
})
export class AxesStrategiquesService {
  private axeurl = environment.API_AxesStrategique


  constructor(private http:HttpClient) { }
  getAll(): Observable<AxesStrategiques[]> {
    return this.http.get<AxesStrategiques[]>(this.axeurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.axeurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.axeurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.axeurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.axeurl}${id}/`);


}
}
