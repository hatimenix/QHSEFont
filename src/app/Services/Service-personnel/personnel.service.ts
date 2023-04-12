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


  addPersonnel(personnel: Personnel, image: File): Observable<Personnel> {
    const formData = new FormData();
    formData.append('compte', personnel.compte);
    formData.append('nom', personnel.nom);
    formData.append('courrier', personnel.courrier);
    formData.append('numero_tel', personnel.numero_tel);
    formData.append('presente_vous', personnel.presente_vous);
    formData.append('fonction', personnel.fonction);
    formData.append('adresse_sip', personnel.adresse_sip);
    formData.append('othermail', personnel.othermail);
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.post<Personnel>(this.API_URL_Utilisateur, formData).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
  addPersonnelFormData(formData: FormData): Observable<Personnel> {
    return this.http.post<Personnel>(this.API_URL_Utilisateur, formData);
  }

  

  updatePersonnel(personnel: Personnel, image: File): Observable<Personnel> {
    const formData = new FormData();
    formData.append('id', personnel.id.toString());
    formData.append('compte', personnel.compte);
    formData.append('nom', personnel.nom);
    formData.append('courrier', personnel.courrier);
    formData.append('numero_tel', personnel.numero_tel);
    formData.append('presente_vous', personnel.presente_vous);
    formData.append('fonction', personnel.fonction);
    formData.append('adresse_sip', personnel.adresse_sip);
    formData.append('othermail', personnel.othermail);
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.put<Personnel>(`${this.API_URL_Utilisateur}${personnel.id}/`, formData).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
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
