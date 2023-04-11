import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Processus } from 'src/app/models/processus';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiProcessusService {

  private processusUrl = environment.API_URL_Processus

  constructor(private http:HttpClient) { }

  getAllProcessus(): Observable<Processus[]> {
    return this.http.get<Processus[]>(this.processusUrl);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.processusUrl, data);
  }
}