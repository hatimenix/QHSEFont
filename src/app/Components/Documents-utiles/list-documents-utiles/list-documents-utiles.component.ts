import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DocumentsUtiles } from 'src/app/models/documents-utiles';
import { ServiceDocumentUtilesService } from 'src/app/Services/Services-document-utile/services-document-utile.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';

declare var window: any;

@Component({
  selector: 'app-list-documents-utiles',
  templateUrl: './list-documents-utiles.component.html',
  styleUrls: ['./list-documents-utiles.component.css']
})
export class ListDocumentsUtilesComponent  {
  utilisateurs: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  updateModalVisible: boolean = true;
  isAscending: boolean = true;
  isReverseSorting: boolean = false;
  autoCloseDropdown: boolean = true;
  fieldsVisible: { [key: string]: boolean } = {
    document: true,
    modified_by: true,
    modified_date:true,
    typologie:true,
  };
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.documentsutiles.length / this.itemsPerPage);
  }

  get displayedDocuments(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.documentsutiles.slice(startIndex, endIndex);
  }

  id:any
  nom:any
  modified_by:any
  modified_date:any
  typologie:any
  document:any
  searchQuery: string = '';
  documentsutiles : DocumentsUtiles[] = []
  selectedDocuments: DocumentsUtiles[] = [];
  deleteModal: any;
  selectedDocumentToDelete: number = 0;
  form = new FormGroup({

    nom: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    modified_date: new FormControl(''),
    modified_by: new FormControl(''),
    typologie: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    document: new FormControl('')

  });
  constructor(private   documentutileservice : ServiceDocumentUtilesService, private router : Router, private apiUtilisateurService: ApiUtilisateurService, private bsModalService: BsModalService){

  }
  ngOnInit(): void {
    this.loadSettingsFromLocalStorage();
    this.getDocumentsutiles();
    this.apiUtilisateurService.getAllUtilsateur().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs); // Print the utilisateurs to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    ); 
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
    document.addEventListener('click', this.onDocumentClick.bind(this));
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 

  }
  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }
  getDocumentsutiles() {
    this.documentutileservice.getAll().subscribe(
      res => {
        this.documentsutiles = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  download(document: string): void {
    this.documentutileservice.downloadFile(document);
  }
  navigateToDocumentutile() {
    this.router.navigate(['/add-Documentutile']);
  }
  updateDocumentutile() : void {

    const formData =  new FormData()
      formData.append("nom", this.nom);
      formData.append("typologie", this.typologie);
      formData.append("modified_by", this.modified_by); 
      if (this.document !== null && this.document !== undefined) {
      formData.append("document", this.document);
    }        
  
    this.documentutileservice.update(this.id, formData)
  
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
updateFile(event: any) {
  const file = event.target.files[0];
  this.document=file

}
getDocumentutileData( id : number,
  nom:any,
  typologie: any,
  modified_by : any

  ){
    this.id = id,
    this.nom=nom,
    this.typologie = typologie,
    this.modified_by = modified_by

}
openDeleteModal(id: number) {
  this.selectedDocumentToDelete = id;
  this.deleteModal.show();
}

delete(ids: number[]) {
  ids.forEach(id => {
    this.documentutileservice.delete(id).subscribe({
      next: (data) => {
        this.documentsutiles = this.documentsutiles.filter(documentutile => documentutile.id !== id);
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
  if (this.selectedDocuments.length > 0) {
    const idsToDelete = this.selectedDocuments.map(d => d.id);
    this.delete(idsToDelete);
  } else if (this.selectedDocumentToDelete) {
    const idToDelete = this.selectedDocumentToDelete;
    this.delete([idToDelete]);
  }
}

  toggleSelection(documentutile: DocumentsUtiles) {
    const index = this.selectedDocuments.indexOf(documentutile);
    if (index > -1) {
      this.selectedDocuments.splice(index, 1); 
    } else {
      this.selectedDocuments.push(documentutile);
    }
  }
  get f() {
    return this.form.controls;
  }
  
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }
  sortByReverseAlphabet() {
    if (this.isReverseSorting) {
    this.documentsutiles.sort((a, b) => (a.nom ?? '').localeCompare(b.nom ?? ''));
    this.isAscending = false;
    this.isReverseSorting = false;
    }else {
      this.documentsutiles.sort((a, b) => (b.nom ?? '').localeCompare(a.nom ?? ''));
      this.isReverseSorting = true;
    }
  }  
  getVisibleColumnsCount(): number {
    let count = 0;
    const fields = [
      'document',
      'modified_by',
      'modified_date',
      'typologie',
    ];
  
    for (const field of fields) {
      if (this.fieldsVisible[field]) {
        count++;
      }
    }
  
    return count;
  }
  onDropdownClick(event: MouseEvent) {
    event.stopPropagation();
  }
  
  toggleDropdown() {
    this.autoCloseDropdown = !this.autoCloseDropdown;
  }
  
  onDocumentClick() {
    this.autoCloseDropdown = true;
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.documentsutiles.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.documentsutiles.length} entrées`;
  }
  closeSuccessModalAfterDelay(): void {
    setTimeout(() => {
      this.modalRef.hide();
      location.reload();
    }, 2300); 
  }
  saveSettingsToLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(this.fieldsVisible));
  }

  loadSettingsFromLocalStorage() {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      this.fieldsVisible = JSON.parse(savedSettings);
    }
  }
}
