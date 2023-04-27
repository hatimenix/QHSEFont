import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from 'src/app/models/Commande';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class CommandeSerService {
  private API_Commande =environment.API_Commande;


  constructor(private http: HttpClient) { }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.API_Commande);
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.API_Commande}${id}`);
  }


  addCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(this.API_Commande, commande);
  }
  

  updateCommande(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.API_Commande}${commande.id_commande}/`, commande);
}

  deleteCommande(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_Commande}${id}`);
  }
}
