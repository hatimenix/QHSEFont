import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Secteur } from 'src/app/models/Secteur';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';
declare var window: any;


@Component({
  selector: 'app-lis-secteur',
  templateUrl: './lis-secteur.component.html',
  styleUrls: ['./lis-secteur.component.css']
})
export class LisSecteurComponent {
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.secteurs.length / this.itemsPerPage);
  }

  get displayedSecteurs(): Secteur[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.secteurs.slice(startIndex, endIndex);
  }
  selectedSecteurs: Secteur[] = [];
  deleteModal: any;
  selectedSecteurToDelete: number = 0;
  id : any 
  secteur_nom : any 
  searchQuery: string = '';
  secteurs : Secteur[] = []
  form = new FormGroup({
    secteur_nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  constructor(private   secteurservice : SecteurService, private router : Router, private bsModalService: BsModalService,){

  }
  ngOnInit(): void {
    this.getSecteurs();
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 

  }
  getSecteurs() {
    this.secteurservice.getAll().subscribe(
      res => {
        this.secteurs = res;
      },
      error => {
        console.log(error);
      }
    );
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
  }
  openDeleteModal(id: number) {
    this.selectedSecteurToDelete = id;
    this.deleteModal.show();
  }
  updateSecteur() : void {
    const formData =  new FormData()
    formData.append("secteur_nom", this.secteur_nom);

  this.secteurservice.update(this.id, formData)

  .subscribe({
      next: (res) => {
          console.log(res);
          this.openModal();
          this.updateModalVisible = false;
      },
      error: (e) => {
          console.error(e);
      }
  });
} 
getSecteurData( id : number,
  secteur_nom : any,
){
  this.id = id,
  this.secteur_nom=secteur_nom
}
  
delete(ids: number[]) {
  ids.forEach(id => {
    this.secteurservice.delete(id).subscribe({
      next: (data) => {
        this.secteurs = this.secteurs.filter(secteur => secteur.id !== id);
        location.reload()
        this.deleteModal.hide();
        },
      error: (err) => {
        console.log(err);
      }
    });
  });
}
deleteItem() {
  if (this.selectedSecteurs.length > 0) {
    const idsToDelete = this.selectedSecteurs.map(s => s.id);
    this.delete(idsToDelete);
  } else if (this.selectedSecteurToDelete) {
    const idToDelete = this.selectedSecteurToDelete;
    this.delete([idToDelete]);
  }
}

  toggleSelection(secteur: Secteur) {
    const index = this.selectedSecteurs.indexOf(secteur);
    if (index > -1) {
      this.selectedSecteurs.splice(index, 1); 
    } else {
      this.selectedSecteurs.push(secteur);
    }
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload()
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
  resetSearchQuery() {
    this.searchQuery = '';
  }
  getDisplayedRange(): string {
    const startIndex = (this.p - 1) * this.itemsPerPage + 1;
    const endIndex = Math.min(this.p * this.itemsPerPage, this.secteurs.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.secteurs.length} entrées`;
  }
 



}
