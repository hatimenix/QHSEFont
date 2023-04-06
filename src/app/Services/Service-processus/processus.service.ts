import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Processus } from 'src/app/models/Processus';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProcessusService {
  private API_Processus =environment.API_Processus;
  constructor(private http: HttpClient) { }

  getProcessus(): Observable<Processus[]> {
    return this.http.get<Processus[]>(this.API_Processus);
  }

  getOne(id: number): Observable<Processus> {
    const url = `${this.API_Processus}/${id}`;
    return this.http.get<Processus>(url);
  }

  create(processus: Processus): Observable<Processus> {
    return this.http.post<Processus>(this.API_Processus, processus);
  }

  update(id: number, processus: Processus): Observable<Processus> {
    const url = `${this.API_Processus}/${id}`;
    return this.http.put<Processus>(url, processus);
  }

  deleteProcessus(id: number): Observable<void> {
    if (!id || isNaN(id)) {
      return throwError('Invalid ID provided.');
    }
    const url = `${this.API_Processus}${id}/`;
    return this.http.delete<void>(url);
  }
}
