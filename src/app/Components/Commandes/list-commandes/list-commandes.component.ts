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
  searchQuery: string = '';
  

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
   
    this.getCommandes();
    this.myForm = new FormGroup({
      type_commande: new FormControl(),
      specificite_regime: new FormControl(),
      specificite_texture: new FormControl(), 
      

     
    });
     //pagination 
     this.itemsPerPageOptions = [5, 10, 15];
     this.itemsPerPage = this.itemsPerPageOptions[0]; 
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
  
  resetTextureFilters(): void {
  
    this.typeTextureSelectionne = ''; 
    this.myForm.reset(); 
    this.getCommandes();
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
  resetRegimeFilters(): void {
  
    this.typeRegimeSelectionne = '';
    this.myForm.reset();
    this.getCommandes();
  }

  //pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.commandes.length / this.itemsPerPage);
}

get displayedCommandes(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.commandes.slice(startIndex, endIndex);
}


onItemsPerPageChange(option: number) {
  this.p = 1; 
  this.itemsPerPage = option; 
}
getPageNumbers(): number[] {
  const pageNumbers = [];
  for (let i = 1; i <= this.totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}

getDisplayedRange(): string {
  const startIndex = (this.p - 1) * this.itemsPerPage + 1;
  const endIndex = Math.min(this.p * this.itemsPerPage, this.commandes.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.commandes.length} entrées`;
}

 //search 
 resetSearchQuery() {
  this.searchQuery = '';

}
}
