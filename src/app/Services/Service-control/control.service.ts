import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Control } from 'src/app/models/Control';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private API_Control =environment.API_Control;

  constructor(private http: HttpClient) { }
  
  getAllControls(): Observable<Control[]> {
    return this.http.get<Control[]>(this.API_Control);
  }

  getControlById(id: number): Observable<Control> {
    return this.http.get<Control>(`${this.API_Control}${id}/`);
  }
  
  addControlFormData(formData: FormData): Observable<Control> {
    return this.http.post<Control>(this.API_Control, formData);
  }
  
  updateControlFormdata(formData: FormData): Observable<any> {
    const id = formData.get('id');
    const url = `${this.API_Control}${id}/`;
    return this.http.put(url, formData);
  }

  deleteControl(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_Control}${id}/`);
  }

}
