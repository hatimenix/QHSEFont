import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotation } from 'src/app/models/cotation';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CotationService {
  private cotationsurl = environment.API_cotations

  constructor(private http:HttpClient) { }

  getAllCotation(): Observable<Cotation[]> {
    return this.http.get<Cotation[]>(this.cotationsurl);
  }

  getCotation(id: number): Observable<Cotation> {
    const url = `${this.cotationsurl}${id}/`;
    return this.http.get<Cotation>(url);
  }

  addCotation(cotation: any): Observable<Cotation> {
    return this.http.post<Cotation>(this.cotationsurl, cotation);
  }

  addCotationFormData(formData: FormData): Observable<Cotation> {
    return this.http.post<Cotation>(this.cotationsurl, formData);
  }

  delCotation(id:number){
    return this.http.delete<Cotation>(this.cotationsurl+id+'/');
  }
  updateCotationFormdata(idCotation: number, formData: FormData): Observable<any> {
    const url = `${this.cotationsurl}${idCotation}/`;
    return this.http.put(url, formData);
  }
}
