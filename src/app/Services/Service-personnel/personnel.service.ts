import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/models/Personnel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private API_User =environment.API_User;

  constructor(private http: HttpClient) { }

  getPersonnel(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.API_User);
  }

  createPersonnel(personnel: Personnel): Observable<Personnel> {
    return this.http.post<Personnel>(this.API_User, personnel);
  }

  updatePersonnel(personnel: Personnel): Observable<Personnel> {
    const apiUrl = `${this.API_User}${personnel.id}/`;
    return this.http.put<Personnel>(apiUrl, personnel);
  }

  deletePersonnel(id: number): Observable<{}> {
    const apiUrl = `${this.API_User}${id}/`;
    return this.http.delete(apiUrl);
  }
}
