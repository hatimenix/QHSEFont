import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Famille } from 'src/app/models/famille';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiFamilleService {

  private API_URL_FAMILLE = environment.API_URL_FAMILLE

  constructor(private http:HttpClient) { }

  getAllFamille(){
    return this.http.get<Famille>(this.API_URL_FAMILLE);
  }
}
