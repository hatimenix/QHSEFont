import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FamilleDangerService } from 'src/app/Services/Service-FamilleDanger/famille-danger.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { FamilleDanger } from 'src/app/models/famille-danger';

declare var window: any;

@Component({
  selector: 'app-list-famille-danger',
  templateUrl: './list-famille-danger.component.html',
  styleUrls: ['./list-famille-danger.component.css']
})
export class ListFamilleDangerComponent {

  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;

  updateModalVisible: boolean = true;

  familleForm !: FormGroup;

  familles : FamilleDanger [] = [];
  selectedFamilles : FamilleDanger [] = [];
  selectedFamilleToDelete : number = 0;
  id : any;
  famille_nom : any;
  deleteModal: any;

  //search
  searchQuery: string = '';

  constructor(private router : Router,
    private bsModalService: BsModalService,
    private apiFamilleDangerService : FamilleDangerService,
    private apiSiteService: ApiSiteService,
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.fetchFamilles();

    this.familleForm = this.formBuilder.group({
      famille_nom : ['', Validators.required],
    });

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );

    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];
  }

  fetchFamilles() {
    this.apiFamilleDangerService.getAllFamille().subscribe((data) => {
      this.familles = data;
    })
  }

  resetSearchQuery() {
    this.searchQuery = '';
  }

  //modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload()
  }

  toggleSelection(famille: FamilleDanger) {
    const index = this.selectedFamilles.indexOf(famille);
    if (index > -1) {
      this.selectedFamilles.splice(index, 1); 
    } else {
      this.selectedFamilles.push(famille);
    }
  }

  openDeleteModal(id: number) {
    this.selectedFamilleToDelete = id;
    this.deleteModal.show();
  }

  delete(ids: number[]) {
    ids.forEach(id => {
      this.apiFamilleDangerService.delFamille(id).subscribe({
        next: (data) => {
          this.familles = this.familles.filter(famille => famille.id !== id);
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
    if (this.selectedFamilles.length > 0) {
      const idsToDelete = this.selectedFamilles.map(s => s.id);
      this.delete(idsToDelete);
    } else if (this.selectedFamilleToDelete) {
      const idToDelete = this.selectedFamilleToDelete;
      this.delete([idToDelete]);
    }
  }

  getFamilleData( id : number,
    famille_nom : any,
  ){
    this.id = id,
    this.famille_nom=famille_nom
  }

  updateFamille() : void {
    const formData = this.familleForm.value;
    const famille: FamilleDanger = new FamilleDanger(
      formData.famille_nom,
    );

    this.apiFamilleDangerService.updateFamille(this.id, famille).subscribe({
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

  //pagination methods 
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.familles.length / this.itemsPerPage);
  }

  get displayedFamilles(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.familles.slice(startIndex, endIndex);
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.familles.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.familles.length} entrées`;
  }

}
