import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/models/Personnel';
import { Site } from 'src/app/models/Site';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private API_Sites =environment.API_Sites;
  private API_User =environment.API_User;
  constructor(private http: HttpClient) { }

  getSite(): Observable<Site[]> {
    return this.http.get<Site[]>(this.API_Sites);
  }

  
  getSiteById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.API_Sites}${id}`);
  }

  
  addSite(site: Site): Observable<Site> {
    return this.http.post<Site>(this.API_Sites, site);
  }

  updateSite(id: number, site: Site): Observable<Site> {
    const url = `${this.API_Sites}${id}/`;
    return this.http.put<Site>(url, site);
  }
  deleteSite(id: number): Observable<void> {
    const url = `${this.API_Sites}${id}`;
    return this.http.delete<void>(url);
  }
  getPersonnelsList(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.API_User);
  }
}
