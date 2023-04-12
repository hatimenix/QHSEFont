import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/models/Personnel';
import { Site } from 'src/app/models/site';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiSiteService {

  private API_URL_SITE = environment.API_URL_SITE
  private API_URL_Utilisateur =environment.API_URL_Utilisateur;

  constructor(private http:HttpClient) { }

  getAllSite(): Observable<Site[]> {
    return this.http.get<Site[]>(this.API_URL_SITE);
  }

  getSite(id: number): Observable<Site> {
    const url = `${this.API_URL_SITE}${id}/`;
    return this.http.get<Site>(url);
  }
  addSite(site: Site): Observable<Site> {
    return this.http.post<Site>(this.API_URL_SITE, site);
  }

  updateSite(id: number, site: Site): Observable<Site> {
    const url = `${this.API_URL_SITE}${id}/`;
    return this.http.put<Site>(url, site);
  }
  deleteSite(id: number): Observable<void> {
    const url = `${this.API_URL_SITE}${id}`;
    return this.http.delete<void>(url);
  }
  getPersonnelsList(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.API_URL_Utilisateur);
  }
}
