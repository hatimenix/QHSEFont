import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeSerService } from 'src/app/Services/Service-commandes/commande-ser.service';
import { Commande } from 'src/app/models/Commande';


@Component({
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.css']
})
export class ListCommandesComponent {
  commandes!: Commande[];

  constructor(private commandeService: CommandeSerService, private router: Router) { }

  ngOnInit() {
    this.getCommandes();
  }

  getCommandes(): void {
    this.commandeService.getCommandes()
      .subscribe(commandes => this.commandes = commandes);
  }

  deleteCommande(id_commande: number): void {
    this.commandeService.deleteCommande(id_commande)
      .subscribe(() => {
        this.commandes = this.commandes.filter(c => c.id_commande !== id_commande);
      });
  }

  addCommande(): void {
    this.router.navigateByUrl('/addc');
  }

}
