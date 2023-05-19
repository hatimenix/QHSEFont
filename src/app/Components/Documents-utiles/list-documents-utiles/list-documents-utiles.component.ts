import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DocumentsUtiles } from 'src/app/models/documents-utiles';
import { ServiceDocumentUtilesService } from 'src/app/Services/Services-document-utile/services-document-utile.service';

declare var window: any;

@Component({
  selector: 'app-list-documents-utiles',
  templateUrl: './list-documents-utiles.component.html',
  styleUrls: ['./list-documents-utiles.component.css']
})
export class ListDocumentsUtilesComponent  {
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
  p = 1; 
  itemsPerPage: number = 5;
  id:any
  nom:any
  modified_by:any
  modified_date:any
  typologie:any
  document:any
  searchQuery: string = '';
  documentsutiles : DocumentsUtiles[] = []
  deleteModal: any;
  idTodelete: number = 0;
  form = new FormGroup({

    nom: new FormControl(''),
    modified_date: new FormControl(''),
    modified_by: new FormControl(''),
    typologie: new FormControl(''),
    document: new FormControl('')

  });
  constructor(private   documentutileservice : ServiceDocumentUtilesService, private router : Router,private bsModalService: BsModalService){

  }
  ngOnInit(): void {
    this.getDocumentsutiles();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
    document.addEventListener('click', this.onDocumentClick.bind(this));

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
  this.idTodelete = id;
  this.deleteModal.show();
}


delete() {
  this.documentutileservice.delete(this.idTodelete).subscribe({
    next: (data) => {
      this.documentsutiles = this.documentsutiles.filter(_ => _.id != this.idTodelete)
      location.reload()
      this.deleteModal.hide();
    },
    error:(err) => {
      console.log(err);
    }


    
  });
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
  
  onDocumentClick(event: MouseEvent) {
    this.autoCloseDropdown = true;
  }
}
