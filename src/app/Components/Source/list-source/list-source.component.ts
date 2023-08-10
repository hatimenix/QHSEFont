import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Source } from 'src/app/models/source';
import { SourceService } from 'src/app/Services/Service-Source/source.service';
declare var window: any;

@Component({
  selector: 'app-list-source',
  templateUrl: './list-source.component.html',
  styleUrls: ['./list-source.component.css']
})
export class ListSourceComponent {
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.sources.length / this.itemsPerPage);
  }

  get displayedSources(): Source[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.sources.slice(startIndex, endIndex);
  }
  selectedSources: Source[] = [];
  deleteModal: any;
  selectedSourceToDelete: number = 0;
  id : any 
  nom : any 
  searchQuery: string = '';
  sources : Source[] = []
  form = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  constructor(private   sourceservice : SourceService, private router : Router, private bsModalService: BsModalService,){

  }
  ngOnInit(): void {
    this.getSources();
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 

  }
  getSources() {
    this.sourceservice.getAll().subscribe(
      res => {
        this.sources = res;
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
    this.selectedSourceToDelete = id;
    this.deleteModal.show();
  }
  updateSource() : void {
    const formData =  new FormData()
    formData.append("nom", this.nom);

  this.sourceservice.update(this.id, formData)

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
getSourceData( id : number,
  nom : any,
){
  this.id = id,
  this.nom=nom
}
  
delete(ids: number[]) {
  ids.forEach(id => {
    this.sourceservice.delete(id).subscribe({
      next: (data) => {
        this.sources = this.sources.filter(source => source.id !== id);
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
  if (this.selectedSources.length > 0) {
    const idsToDelete = this.selectedSources.map(s => s.id);
    this.delete(idsToDelete);
  } else if (this.selectedSourceToDelete) {
    const idToDelete = this.selectedSourceToDelete;
    this.delete([idToDelete]);
  }
}

  toggleSelection(source: Source) {
    const index = this.selectedSources.indexOf(source);
    if (index > -1) {
      this.selectedSources.splice(index, 1); 
    } else {
      this.selectedSources.push(source);
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.sources.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.sources.length} entrées`;
  }
 
  closeSuccessModalAfterDelay(): void {
    setTimeout(() => {
      this.modalRef.hide();
      location.reload();
    }, 2300); 
  }


}
