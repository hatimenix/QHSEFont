import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FicheserService } from 'src/app/Services/Service-fiche-restauration/ficheser.service';
import { FicheTechnique } from 'src/app/models/FicheTechnique';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit {
  fiches!: FicheTechnique[];
  //filtrage
  typePlatSelectionne!: string;
   //search
  searchQuery: string = '';
  myForm: any;
  
  //delete modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  ficheIdToDelete: number = 0;

  constructor(private ficheService: FicheserService, 
    public modalService: BsModalService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      type_plat: new FormControl()
    });
    this.getFiches();

    
    //pagination 
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 
  }

  getFiches(): void {
    this.ficheService.getAllFiches().subscribe((fiches) => {
      this.fiches = fiches;
      
    });
  }

  deleteFiche(id: number): void {
    this.ficheService.deleteFiche(id).subscribe(() => {
      this.fiches = this.fiches.filter((f) => f.id_fiche !== id);
    });
  }

 
//fonction de filtrage par type de plat
  filterFiches(): void {
    if (this.typePlatSelectionne) {
      this.ficheService.getAllFiches().subscribe((fiches) => {
        this.fiches = fiches.filter((f) => f.type_plat === this.typePlatSelectionne);
      });
    } else {
      this.getFiches();
    }
  }
  resetTypeFilters(): void {
    // Reset the selected filters and reload the data
    this.typePlatSelectionne = ''; // Reset the selected type filter
    this.myForm.reset(); // Reset the form and selected site filter
    this.getFiches(); // Reload the data
  }


  //delete modal 
confirmDelete(): void {
  this.ficheService.deleteFiche(this.ficheIdToDelete)
    .subscribe(() => {
      this.fiches = this.fiches.filter(f => f.id_fiche !== this.ficheIdToDelete);
      this.modalRef.hide();
    });
}

  declineDelete(): void {
  this.modalRef.hide();
  }
  //search 
  resetSearchQuery() {
    this.searchQuery = '';
 
  }

  //afficher juste le nom du fichier 
getFileNameFromPath(filePath: string | File | undefined): string {
  if (!filePath) return 'Aucun fichier joint';
  
  if (typeof filePath === 'string') {
    const parts = filePath.split('/');
    return parts.pop() || 'Aucun fichier joint';
  }
  
  return filePath.name || 'Aucun fichier joint';
}
//pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.fiches.length / this.itemsPerPage);
}

get displayedFiches(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.fiches.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.fiches.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.fiches.length} entrées`;
}



}
