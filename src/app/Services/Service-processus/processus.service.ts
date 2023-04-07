import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/models/Personnel';
import { Processus } from 'src/app/models/Processus';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProcessusService {
  private API_Processus =environment.API_Processus;
  private API_User =environment.API_User;
  constructor(private http: HttpClient) { }

  getProcessus(): Observable<Processus[]> {
    return this.http.get<Processus[]>(this.API_Processus);
  }

  
  getProcessusById(id: number): Observable<Processus> {
    return this.http.get<Processus>(`${this.API_Processus}${id}`);
  }

  
  addProcessus(processus: Processus): Observable<Processus> {
    return this.http.post<Processus>(this.API_Processus, processus);
  }
  

  
  updateProcessus(id: number, processus: Processus): Observable<Processus> {
    const url = `${this.API_Processus}${id}/`;
    return this.http.put<Processus>(url, processus);
  }

  deleteProcessus(id: number): Observable<void> {
    const url = `${this.API_Processus}${id}`;
    return this.http.delete<void>(url);
  }
  getPersonnelsList(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.API_User);
  }
}
