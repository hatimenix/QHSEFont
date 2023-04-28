import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  myForm: any;
  commandes!: Commande[];
  //modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  commandIdToDelete: number = 0;

  typeCommandeSelectionne!: string;
  typeRegimeSelectionne!:string;
  typeTextureSelectionne!:string;

  
  constructor(private commandeService: CommandeSerService, private router: Router, 
  public modalService: BsModalService) { }

  ngOnInit() {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');
      // rafraîchir la page
      location.reload();
    }
    // aller en haut de la page
    window.scrollTo(0, 0);
    this.getCommandes();
    this.myForm = new FormGroup({
      type_commande: new FormControl(),
      specificite_regime: new FormControl(),
      specificite_texture: new FormControl()
     
    });
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

  //filtrage par type de commande 
  filterCommandeByType(): void {
    if (this.typeCommandeSelectionne) {
      this.commandeService.getCommandes().subscribe((commandes) => {
        this.commandes = commandes.filter((c) => c.type_commande === this.typeCommandeSelectionne);
      });
    } else {
      this.getCommandes();
    }
  }
  //filtrage par spécifité texture 
  filterCommandeByTexture(): void {
    if (this.typeTextureSelectionne) {
      this.commandeService.getCommandes().subscribe((commandes) => {
        this.commandes = commandes.filter((c) => c.specificite_texture === this.typeTextureSelectionne);
      });
    } else {
      this.getCommandes();
    }
  }
  //filtrage par spécifité régime 
  filterCommandeByRegime(): void {
    if (this.typeRegimeSelectionne) {
      this.commandeService.getCommandes().subscribe((commandes) => {
        this.commandes = commandes.filter((c) => c.specificite_regime === this.typeRegimeSelectionne);
      });
    } else {
      this.getCommandes();
    }
  }

}
