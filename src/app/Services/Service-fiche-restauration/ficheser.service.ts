
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { FicheTechnique } from 'src/app/models/FicheTechnique';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class FicheserService {
  
  private API_Fiche =environment.API_Fiche;

  constructor(private http: HttpClient) { }
  
  getAllFiches(): Observable<FicheTechnique[]> {
    return this.http.get<FicheTechnique[]>(this.API_Fiche);
  }

  getFicheById(id: number): Observable<FicheTechnique> {
    return this.http.get<FicheTechnique>(`${this.API_Fiche}${id}/`);
  }

  addFiche(fiche: FicheTechnique): Observable<FicheTechnique> {
    const formData = new FormData();
    formData.append('nom_fiche', fiche.nom_fiche);
    formData.append('type_plat', fiche.type_plat);
    if (fiche.fichier) {
      formData.append('fichier', fiche.fichier, fiche.fichier.name);
    }
    return this.http.post<FicheTechnique>(this.API_Fiche, formData)
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }
  
  addFicheFormData(formData: FormData): Observable<FicheTechnique> {
    return this.http.post<FicheTechnique>(this.API_Fiche, formData);
  }

  updateFiche(fiche: FicheTechnique): Observable<FicheTechnique> {
    return this.http.put<FicheTechnique>(`${this.API_Fiche}${fiche.id_fiche}/`, fiche);
  }
  updateFicheFormdata(formData: FormData): Observable<any> {
    const idFiche = formData.get('id_fiche');
    const url = `${this.API_Fiche}${idFiche}/`;
    return this.http.put(url, formData);
  }

  deleteFiche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_Fiche}${id}/`);
  }
  downloadFiche(id: number): Observable<Blob> {
    return this.http.get(`${this.API_Fiche}/${id}`, { responseType: 'blob' });
  }
  
}
