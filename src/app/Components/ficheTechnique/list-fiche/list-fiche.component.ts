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
  showPopover: boolean = false;
  isAscending: boolean = true;
  isReverseSorting: boolean = false;
  myForm: any;
  filterField: string = '';
  searchQuery: string = '';
  fieldSearchQuery: string = '';





  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  ficheIdToDelete: number = 0;  
  textSize: number = 16;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.filteredFiches.length / this.itemsPerPage);
  }

  get displayedFiches(): FicheTechnique[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFiches.slice(startIndex, endIndex);
  }
  id_fiche : any 
  nom : any 
  fichier: any ;
  nom_fiche: any;
  type_plat: any; 

  filteredFiches: FicheTechnique[] = [];
  fiches : FicheTechnique[] = []
  selectedFiche: FicheTechnique[] = [];


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
 
    getFiches() {
    this.ficheService.getAllFiches().subscribe(
      res => {
        this.fiches = res;
        this.filteredFiches = res; 

      },
      error => {
        console.log(error);
      }
    );
   
  }
 
//fonction filtrage 
  filterByField(fieldName: string): void {
    this.filterField = fieldName;
    this.togglePopover();
    this.searchQuery = '';
  }
  applyFieldFilter(): void {
    const searchValue = this.fieldSearchQuery?.toLowerCase();
  
    this.filteredFiches = this.fiches.filter((fiche) => {
      const fieldValue = fiche[this.filterField]?.toLowerCase();
  
      if (fieldValue && searchValue) {
        return fieldValue.includes(searchValue);
      }
  
      return true;
    });
  }
  
  resetTable(): void {
    if (this.fieldSearchQuery && this.filteredFiches.length === 0) {
      this.fieldSearchQuery = ''; 
      this.filterField = '';
      this.filteredFiches = this.fiches;
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
  //pagination
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
  resetSearchQuery() {
    this.searchQuery = '';
  }
  getDisplayedRange(): string {
    const startIndex = (this.p - 1) * this.itemsPerPage + 1;
    const endIndex = Math.min(this.p * this.itemsPerPage, this.filteredFiches.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.filteredFiches.length} entrées`;
  }





  deleteFiche(id: number): void {
    this.ficheService.deleteFiche(id).subscribe(() => {
      this.fiches = this.fiches.filter((f) => f.id_fiche !== id);
    });
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


}
