import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reunion } from 'src/app/models/Reunion';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ReunionService {


  private API_reunion = environment.API_reunion;

  constructor(private http: HttpClient) { }


  getReunions(): Observable<Reunion[]> {
    return this.http.get<Reunion[]>(this.API_reunion);
  }

  getReunionById(id: number): Observable<Reunion> {
    return this.http.get<Reunion>(`${this.API_reunion}${id}`);
  }


  addReunion(formData: FormData): Observable<Reunion> {
    return this.http.post<Reunion>(this.API_reunion, formData);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_reunion}${id}/`, data);
  }

  deleteReunion(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_reunion}${id}`);
  }


}
