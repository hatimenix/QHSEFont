import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnalyseRisquesService {
  private analyserisqueurl = environment.API_analyseRisque

  constructor(private http:HttpClient) { }

  getAllAnalyseRisques(): Observable<AnalyseRisques[]> {
    return this.http.get<AnalyseRisques[]>(this.analyserisqueurl);
  }

  getAnalyseRisques(id: number): Observable<AnalyseRisques> {
    const url = `${this.analyserisqueurl}${id}/`;
    return this.http.get<AnalyseRisques>(url);
  }

  addAnalyseRisque(analyserisque: any): Observable<AnalyseRisques> {
    return this.http.post<AnalyseRisques>(this.analyserisqueurl, analyserisque);
  }

  addAnalyseRisqueFormData(formData: FormData): Observable<AnalyseRisques> {
    return this.http.post<AnalyseRisques>(this.analyserisqueurl, formData);
  }

  delAnalyseRisque(id:number){
    return this.http.delete<AnalyseRisques>(this.analyserisqueurl+id+'/');
  }
  updateAnalyseRisqueFormdata(idAnalyseRisque: number, formData: FormData): Observable<any> {
    const url = `${this.analyserisqueurl}${idAnalyseRisque}/`;
    return this.http.put(url, formData);
  }

}
