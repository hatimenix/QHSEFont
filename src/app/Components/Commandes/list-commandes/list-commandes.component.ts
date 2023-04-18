import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommandeSerService } from 'src/app/Services/Service-commandes/commande-ser.service';
import { Commande } from 'src/app/models/Commande';


@Component({
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.css']
})
export class ListCommandesComponent {
  commandes!: Commande[];
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  commandIdToDelete: number = 0;

  searchTerm = '';

  constructor(private commandeService: CommandeSerService, private router: Router, public modalService: BsModalService) { }

  ngOnInit() {
    this.getCommandes();
  }

  getCommandes(): void {
    this.commandeService.getCommandes()
      .subscribe(commandes => this.commandes = commandes);
  }

  deleteCommande(id_commande: number): void {
    this.commandIdToDelete = id_commande;
    this.modalRef = this.modalService.show(this.deleteModal);
  }
  

  addCommande(): void {
    this.router.navigateByUrl('/addc');
  }
  //filtrage 
  filterCommandes(): Commande[] {
    return this.commandes.filter(c =>
      c.date_commande.toLowerCase().includes(this.searchTerm.toLowerCase())
      || c.type_commande.toLowerCase().includes(this.searchTerm.toLowerCase())
      || c.quantite.toLowerCase().includes(this.searchTerm.toLowerCase())
      || c.specificite_regime.toLowerCase().includes(this.searchTerm.toLowerCase())
      || c.specificite_texture.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  //delete modal
  confirmDelete(): void {
    this.commandeService.deleteCommande(this.commandIdToDelete)
      .subscribe(() => {
        this.commandes = this.commandes.filter(c => c.id_commande !== this.commandIdToDelete);
        this.modalRef.hide();
      });
  }
  
    declineDelete(): void {
    this.modalRef.hide();
    }

}
