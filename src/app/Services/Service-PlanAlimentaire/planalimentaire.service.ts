import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanAlimentaire } from 'src/app/models/PlanAlimentaire';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlanalimentaireService {
  private API_plan_alimentaire = environment.API_plan_alimentaire;

  constructor(private http: HttpClient) { }


  getPlanAlimentaires(): Observable<PlanAlimentaire[]> {
    return this.http.get<PlanAlimentaire[]>(this.API_plan_alimentaire);
  }

  getPlanAlimentaireById(id: number): Observable<PlanAlimentaire> {
    return this.http.get<PlanAlimentaire>(`${this.API_plan_alimentaire}${id}`);
  }


  addPlanAlimentaire(formData: FormData): Observable<PlanAlimentaire> {
    return this.http.post<PlanAlimentaire>(this.API_plan_alimentaire, formData);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_plan_alimentaire}${id}/`, data);
  }

  deletePlanAlimentaire(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_plan_alimentaire}${id}`);
  }
}
