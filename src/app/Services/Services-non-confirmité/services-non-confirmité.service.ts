import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, catchError, fromEvent, map, switchMap, throwError} from 'rxjs';
import { Nc } from 'src/app/models/nc';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ServicesNonConfirmitéService {
  private ncurl = environment.API_nc


  constructor(private http:HttpClient) { }
  getAll(): Observable<Nc[]> {
    return this.http.get<Nc[]>(this.ncurl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.ncurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.ncurl, data);
  }


  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.ncurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.ncurl}${id}/`);


}
downloadFile(piece_jointe: any): void {
  this.http.get(piece_jointe, { responseType: 'blob' }).subscribe(blob => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = piece_jointe.split('/').pop();
    link.click();
  });
}
getExistingFileUrl(id: number): Observable<any> {
  return this.http.get(`${this.ncurl}${id}/file-url/`, { responseType: 'blob' }).pipe(
    switchMap((blob: Blob) => {
      const reader = new FileReader();
      reader.readAsText(blob);
      return fromEvent(reader, 'loadend').pipe(
        map((event: any) => {
          const jsonString = event.target.result;
          const jsonObject = JSON.parse(jsonString);
          return jsonObject.file_url;
        })
      );
    }),
    catchError((error: any) => {
      console.error(error);
      return throwError('Error occurred while retrieving the existing file URL.');
    })
  );
}
getStatsByNature(): Observable<any[]> {
   const url = `${this.ncurl}stats_by_nature/`;
    return this.http.get<any>(url);
  }  
  getStatsDelaiPrevuVsDateNc(): Observable<any[]> {
    const url = `${this.ncurl}stats_delai_prevu_vs_date_nc/`;
    return this.http.get<any[]>(url);
  }
  
}


