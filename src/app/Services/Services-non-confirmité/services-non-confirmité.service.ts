import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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
// downloadPiece(id: number): Observable<Blob> {
//   return this.http.get(`${this.ncurl}/${id}`, { responseType: 'blob' });
// }

// downloadPiece(id: number): void {
//   this.nc.downloadPiece(id).subscribe(
//     (response: any) => {
//       const blob = new Blob([response], { type: 'application/octet-stream' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       const filename = response.fichier.split('/').pop();
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     },
//     (error: any) => {
//       console.log(error);
//     }
//   );
// }

}
