import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Source } from 'src/app/models/source';
@Injectable({
  providedIn: 'root'
})
export class SourceService {
  private sourceurl = environment.API_source


  constructor(private http:HttpClient) { }
  getAll(): Observable<Source[]> {
    return this.http.get<Source[]>(this.sourceurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.sourceurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.sourceurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.sourceurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.sourceurl}${id}/`);


}
}
