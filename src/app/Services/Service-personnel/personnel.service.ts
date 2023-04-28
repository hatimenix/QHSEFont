import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Personnel } from 'src/app/models/Personnel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private API_URL_Utilisateur =environment.API_URL_Utilisateur;

  constructor(private http: HttpClient) { }

  getPersonnels(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.API_URL_Utilisateur);
  }

  getPersonnelById(id: number): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.API_URL_Utilisateur}${id}`);
  }
  addPersonnelFormData(formData: FormData): Observable<Personnel> {
    return this.http.post<Personnel>(this.API_URL_Utilisateur, formData);
  }

  updatePersonnelFormdata(formData: FormData): Observable<any> {
    const id = formData.get('id');
    const url = `${this.API_URL_Utilisateur}${id}/`;
    return this.http.put(url, formData);
  }


  
deletePersonnel(id: number): Observable<void> {
  if (!id || isNaN(id)) {
    return throwError('Invalid ID provided.');
  }
  const url = `${this.API_URL_Utilisateur}${id}/`;
  return this.http.delete<void>(url);
}

}
