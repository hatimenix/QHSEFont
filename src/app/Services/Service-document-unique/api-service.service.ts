import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'src/app/models/service';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private API_URL_SERVICE = environment.API_URL_SERVICE

  constructor(private http:HttpClient) { }

  getAllService(){
    return this.http.get<Service>(this.API_URL_SERVICE);
  }
}
