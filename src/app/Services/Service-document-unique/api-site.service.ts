import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from 'src/app/models/site';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiSiteService {

  private API_URL_SITE = environment.API_URL_SITE

  constructor(private http:HttpClient) { }

  getAllSite(): Observable<Site[]> {
    return this.http.get<Site[]>(this.API_URL_SITE);
  }

  getSite(id: number): Observable<Site> {
    const url = `${this.API_URL_SITE}${id}/`;
    return this.http.get<Site>(url);
  }
}
