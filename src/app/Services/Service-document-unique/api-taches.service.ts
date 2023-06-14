import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Taches } from 'src/app/models/taches';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiTachesService {

  API_URL_TA = environment.API_URL_TA

  constructor(private http:HttpClient) { }

  getAllTaches(): Observable<Taches[]> {
    return this.http.get<Taches[]>(this.API_URL_TA);
  }

  getTaches(id: number): Observable<Taches> {
    const url = `${this.API_URL_TA}${id}/`;
    return this.http.get<Taches>(url);
  }

  addTaches(tache: any): Observable<Taches> {
    return this.http.post<Taches>(this.API_URL_TA, tache);
  }

  addTacheFormData(formData: FormData): Observable<Taches> {
    return this.http.post<Taches>(this.API_URL_TA, formData);
  }

  delTache(id:number){
    return this.http.delete<Taches>(this.API_URL_TA+id+'/');
  }

  getTachesByRealisationId(realisationId: number): Observable<Taches[]> {
    return this.http.get<Taches[]>(`${this.API_URL_TA}?realisation_associee=${realisationId}`).pipe(
      map((taches: Taches[]) => {
        return taches.filter(t => t.realisation_associee === realisationId);
      })
    );
  }
  updateTacheFormdata(idTache: number, formData: FormData): Observable<any> {
    const url = `${this.API_URL_TA}${idTache}/`;
    return this.http.put(url, formData);
  }
  downloadFile(piece_jointe: any): void {
    this.http.get(piece_jointe, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = piece_jointe.split('/').pop();
      link.click();
    });
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.API_URL_TA}${id}`);
  }

  
}
