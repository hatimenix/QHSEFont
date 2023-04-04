import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluations } from 'src/app/models/evaluations';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiEvaluationService {

  API_URL_EVA = environment.API_URL_EVA

  constructor(private http:HttpClient) { }

  getAllEvaluation(): Observable<Evaluations[]> {
    return this.http.get<Evaluations[]>(this.API_URL_EVA);
  }

  getEvaluation(id: number): Observable<Evaluations> {
    const url = `${this.API_URL_EVA}${id}/`;
    return this.http.get<Evaluations>(url);
  }
}
