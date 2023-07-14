import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciceSecurite } from 'src/app/models/ExerciceSecurite';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ExerciceSecuriteService {


  private API_exercice_sec = environment.API_exercice_securite;

  constructor(private http: HttpClient) { }


  getExerciceSecurites(): Observable<ExerciceSecurite[]> {
    return this.http.get<ExerciceSecurite[]>(this.API_exercice_sec);
  }

  getExerciceSecuriteById(id: number): Observable<ExerciceSecurite> {
    return this.http.get<ExerciceSecurite>(`${this.API_exercice_sec}${id}`);
  }


  addExerciceSecurite(formData: FormData): Observable<ExerciceSecurite> {
    return this.http.post<ExerciceSecurite>(this.API_exercice_sec, formData);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_exercice_sec}${id}/`, data);
  }

  deleteExerciceSecurite(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_exercice_sec}${id}`);
  }






}
