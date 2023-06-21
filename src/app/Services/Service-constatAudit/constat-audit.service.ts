import { ConstatAudit } from './../../models/constat-audit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConstatAuditService {
  private API_constatAudit = environment.API_constatAudit;

  constructor(private http: HttpClient) { }


  getConstatAudits(): Observable<ConstatAudit[]> {
    return this.http.get<ConstatAudit[]>(this.API_constatAudit);
  }

  getConstatAuditById(id: number): Observable<ConstatAudit> {
    return this.http.get<ConstatAudit>(`${this.API_constatAudit}${id}`);
  }


  addConstatAudit(formData: FormData): Observable<ConstatAudit> {
    return this.http.post<ConstatAudit>(this.API_constatAudit, formData);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_constatAudit}${id}/`, data);
  }

  deleteConstatAudit(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_constatAudit}${id}`);
  }
  getStatsByIntituleConstat(): Observable<any> {
    const url = `${this.API_constatAudit}stats_by_intitule_constat/`;
    return this.http.get<any>(url);
  }
}
