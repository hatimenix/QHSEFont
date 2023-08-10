import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TypePartie } from 'src/app/models/typepartie';
import { TypepartieService } from 'src/app/Services/Service-TypePartie/typepartie.service';
declare var window: any;

@Component({
  selector: 'app-list-typeparties',
  templateUrl: './list-typeparties.component.html',
  styleUrls: ['./list-typeparties.component.css']
})
export class ListTypepartiesComponent {
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.typeparties.length / this.itemsPerPage);
  }

  get displayedTypeParties():TypePartie[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.typeparties.slice(startIndex, endIndex);
  }
  selectedTypeParties:TypePartie[] = [];
  deleteModal: any;
  selectedTypePartieToDelete: number = 0;
  id : any 
  nom : any 
  searchQuery: string = '';
  typeparties :TypePartie[] = []
  form = new FormGroup({
    nom: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
  });
  constructor(private   typepartieservice :TypepartieService, private router : Router, private bsModalService: BsModalService,){

  }
  ngOnInit(): void {
    this.getTypeParties();
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 

  }
  getTypeParties() {
    this.typepartieservice.getAll().subscribe(
      res => {
        this.typeparties = res;
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
    this.selectedTypePartieToDelete = id;
    this.deleteModal.show();
  }
  updateTypePartie() : void {
    const formData =  new FormData()
    formData.append("nom", this.nom);

  this.typepartieservice.update(this.id, formData)

  .subscribe({
      next: (res) => {
          console.log(res);
          this.openModal();
          this.updateModalVisible = false;
          this.closeSuccessModalAfterDelay();
      },
      error: (e) => {
          console.error(e);
      }
  });
} 
getTypePartieData( id : number,
  nom : any,
){
  this.id = id,
  this.nom=nom
}
  
delete(ids: number[]) {
  ids.forEach(id => {
    this.typepartieservice.delete(id).subscribe({
      next: (data) => {
        this.typeparties = this.typeparties.filter(typepartie => typepartie.id !== id);
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
  if (this.selectedTypeParties.length > 0) {
    const idsToDelete = this.selectedTypeParties.map(t => t.id);
    this.delete(idsToDelete);
  } else if (this.selectedTypePartieToDelete) {
    const idToDelete = this.selectedTypePartieToDelete;
    this.delete([idToDelete]);
  }
}

  toggleSelection(typepartie:TypePartie) {
    const index = this.selectedTypeParties.indexOf(typepartie);
    if (index > -1) {
      this.selectedTypeParties.splice(index, 1); 
    } else {
      this.selectedTypeParties.push(typepartie);
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.typeparties.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.typeparties.length} entrées`;
  }
  closeSuccessModalAfterDelay(): void {
    setTimeout(() => {
      this.modalRef.hide();
      location.reload();
    }, 2300); 
  }
  get f() {
    return this.form.controls;
  }
}
