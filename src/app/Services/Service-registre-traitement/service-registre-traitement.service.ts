import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceRegistreTraitementService {

  readonly traitement = environment.API_registre_de_traitement;


  constructor(private http:HttpClient,) { }

 gettraitementlist():Observable<any[]>{
  return this.http.get<any[]>(this.traitement);
}

 addtraitement(val:any){
  return this.http.post(this.traitement,val);
}

updateTraitement(val:any){
  return this.http.put(this.traitement,val);
}

deleteTraitement(val:any){
  return this.http.delete(this.traitement+val);
}

}
