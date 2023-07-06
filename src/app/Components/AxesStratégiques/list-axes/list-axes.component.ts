import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AxesStrategiques } from 'src/app/models/axes-strategiques';
import { AxesStrategiquesService } from 'src/app/Services/Service-AxesStratégiques/axes-strategiques.service';
declare var window: any;

@Component({
  selector: 'app-list-axes',
  templateUrl: './list-axes.component.html',
  styleUrls: ['./list-axes.component.css']
})
export class ListAxesComponent {
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.axes.length / this.itemsPerPage);
  }

  get displayedAxes(): AxesStrategiques[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.axes.slice(startIndex, endIndex);
  }
  selectedAxes: AxesStrategiques[] = [];
  deleteModal: any;
  selectedAxeToDelete: number = 0;
  id : any 
  axe : any 
  sigle : any 
  searchQuery: string = '';
  axes : AxesStrategiques[] = []
  form = new FormGroup({
    axe: new FormControl('', [Validators.required, Validators.minLength(3)]),
    sigle: new FormControl(''),

  });
  constructor(private   axeservice : AxesStrategiquesService, private router : Router, private bsModalService: BsModalService,){

  }
  ngOnInit(): void {
    this.getAxes();
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 

  }
  getAxes() {
    this.axeservice.getAll().subscribe(
      res => {
        this.axes = res;
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
    this.selectedAxeToDelete = id;
    this.deleteModal.show();
  }
  updateAxe() : void {
    const formData =  new FormData()
    formData.append("axe", this.axe);
    formData.append("sigle", this.sigle);

  this.axeservice.update(this.id, formData)

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
getAxeData( id : number,
  axe : any,
  sigle : any,
){
  this.id = id,
  this.axe=axe,
  this.sigle = sigle
}
  
delete(ids: number[]) {
  ids.forEach(id => {
    this.axeservice.delete(id).subscribe({
      next: (data) => {
        this.axes = this.axes.filter(axe => axe.id !== id);
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
  if (this.selectedAxes.length > 0) {
    const idsToDelete = this.selectedAxes.map(f => f.id);
    this.delete(idsToDelete);
  } else if (this.selectedAxeToDelete) {
    const idToDelete = this.selectedAxeToDelete;
    this.delete([idToDelete]);
  }
}

  toggleSelection(axe: AxesStrategiques) {
    const index = this.selectedAxes.indexOf(axe);
    if (index > -1) {
      this.selectedAxes.splice(index, 1); 
    } else {
      this.selectedAxes.push(axe);
    }
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.axes.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.axes.length} entrées`;
  }
 


}
