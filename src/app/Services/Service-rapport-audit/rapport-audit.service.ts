import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RapportAudit } from 'src/app/models/rapportAudit';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RapportAuditService {

  
  private API_Rapport_audit =environment.API_Rapport_audit;
  constructor(private http: HttpClient) { }

   
  getRapport(): Observable<RapportAudit[]> {
    return this.http.get<RapportAudit[]>(this.API_Rapport_audit);
  }

  getRapportById(id: number): Observable<RapportAudit> {
    return this.http.get<RapportAudit>(`${this.API_Rapport_audit}${id}`);
  }

  addRapportFormData(formData: FormData): Observable<RapportAudit> {
    return this.http.post<RapportAudit>(this.API_Rapport_audit, formData);
  }

  updateRapportFormdata(formData: FormData): Observable<any> {
    const id = formData.get('id');
    const url = `${this.API_Rapport_audit}${id}/`;
    return this.http.put(url, formData);
  }

  deleteRapport(id: number): Observable<void> {
  if (!id || isNaN(id)) {
    return throwError('Invalid ID provided.');
  }
  const url = `${this.API_Rapport_audit}${id}/`;
  return this.http.delete<void>(url);
}
}
