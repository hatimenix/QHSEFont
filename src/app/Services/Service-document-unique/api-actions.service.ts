import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions } from 'src/app/models/actions';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiActionsService {

  API_URL_AC = environment.API_URL_AC

  constructor(private http:HttpClient) { }

  getAllActions(): Observable<Actions[]> {
    return this.http.get<Actions[]>(this.API_URL_AC);
  }

  getActions(id: number): Observable<Actions> {
    const url = `${this.API_URL_AC}${id}/`;
    return this.http.get<Actions>(url);
  }

  addAction(action: any): Observable<Actions> {
    return this.http.post<Actions>(this.API_URL_AC, action);
  }

  addActionFormData(formData: FormData): Observable<Actions> {
    return this.http.post<Actions>(this.API_URL_AC, formData);
  }

  delAction(id:number){
    return this.http.delete<Actions>(this.API_URL_AC+id+'/');
  }
}
