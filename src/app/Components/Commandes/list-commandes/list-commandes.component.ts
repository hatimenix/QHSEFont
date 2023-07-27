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
    id_commande: any;
    date_commande: any;
    type_commande: any;
    etat_commande: any;
    quantite: any;
    specificite_regime: any; 
    specificite_texture: any;


  //modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  commandIdToDelete: number = 0;

  typeCommandeSelectionne!: string;
  typeRegimeSelectionne!:string;
  typeTextureSelectionne!:string;

  //filtrage
  showPopover: boolean = false;
  filterField: string = '';
  searchQuery: string = '';
  fieldSearchQuery: string = '';
  filteredCommandes: Commande[] = [];
  selectedCommande: Commande[] = [];

  
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
  
  getCommandes() {
    this.commandeService.getCommandes().subscribe(
      res => {
        this.commandes = res;
        this.filteredCommandes = res; 

      },
      error => {
        console.log(error);
      }
    );
   
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




  //pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.commandes.length / this.itemsPerPage);
}

get displayedCommandes(): Commande[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.filteredCommandes.slice(startIndex, endIndex);
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
//fonction filtrage 
filterByField(fieldName: string): void {
  this.filterField = fieldName;
  this.togglePopover();
  this.searchQuery = '';
}
applyFieldFilter(): void {
  const searchValue = this.fieldSearchQuery?.toLowerCase();

  this.filteredCommandes = this.commandes.filter((commande) => {
    const fieldValue = commande[this.filterField]?.toLowerCase();

    if (fieldValue && searchValue) {
      return fieldValue.includes(searchValue);
    }

    return true;
  });
}

resetTable(): void {
  if (this.fieldSearchQuery && this.filteredCommandes.length === 0) {
    this.fieldSearchQuery = ''; 
    this.filterField = '';
    this.filteredCommandes = this.commandes;
  }
}
 
togglePopover() {
  this.showPopover = !this.showPopover;
}
closePopover(): void {
  this.showPopover = false;
}
handleReset(): void {
  
  this.resetTable();
  this.closePopover();
  const isFirstVisit = history.state.isFirstVisit;
  if (!isFirstVisit) {
    history.replaceState({ isFirstVisit: true }, '');
    location.reload();
  }
  window.scrollTo(0, 0);
  
  
}  

}
