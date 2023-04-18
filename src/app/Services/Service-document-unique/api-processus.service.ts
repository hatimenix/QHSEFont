import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Processus } from 'src/app/models/processus';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiProcessusService {

  private API_URL_PR = environment.API_URL_PR

  constructor(private http:HttpClient) { }

  getAllProcessus(): Observable<Processus[]> {
    return this.http.get<Processus[]>(this.API_URL_PR);
  }

  getProcessus(id: number): Observable<Processus> {
    const url = `${this.API_URL_PR}${id}/`;
    return this.http.get<Processus>(url);
  }
}

