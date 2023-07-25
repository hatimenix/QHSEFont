import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Service } from 'src/app/models/service';
declare var window: any;

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent {

  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  personnel$ !: Observable<any>;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.services.length / this.itemsPerPage);
  }

  get displayedServices(): Service[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.services.slice(startIndex, endIndex);
  }
  selectedServices: Service[] = [];
  deleteModal: any;
  selectedServiceToDelete: number = 0;
  id : any 
  service_nom : any 
  chef_service :any
  searchQuery: string = '';
  services : Service[] = []
  form = new FormGroup({
  service_nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
  chef_service: new FormControl('')

  });
  constructor(private servicesService : ApiServiceService, private router : Router, private bsModalService: BsModalService,
    private personnelService: PersonnelService,
    ){

  }
  ngOnInit(): void {
    this.getServices();
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 
    this.personnel$ = this.personnelService.getPersonnels();

  }
  getServices() {
    this.servicesService.getAllService().subscribe(
      res => {
        this.services = res;
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
    this.selectedServiceToDelete = id;
    this.deleteModal.show();
  }
 
 
  updateService(): void {
    const formData = new FormData();
    formData.append("service_nom", this.service_nom);
  
    // Check if chef_service is not null and not undefined before appending it to FormData
    if (this.form.value.chef_service !== null && this.form.value.chef_service !== undefined) {
      // Ensure chef_service is an array, if not convert it to an array with a single value
      const chefServiceIds: number[] = Array.isArray(this.form.value.chef_service)
        ? this.form.value.chef_service.map((id: any) => Number(id))
        : [Number(this.form.value.chef_service)];

      chefServiceIds.forEach((chefServiceId) => {
        formData.append('chef_service', String(chefServiceId));
      });
    }
  
    this.servicesService.update(this.id, formData).subscribe({
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
getServiceData( id : number,
  service_nom : any,

){
  this.id = id,
  this.service_nom=service_nom
}
  
delete(ids: number[]) {
  ids.forEach(id => {
    this.servicesService.delete(id).subscribe({
      next: (data) => {
        this.services = this.services.filter(service => service.id !== id);
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
  if (this.selectedServices.length > 0) {
    const idsToDelete = this.selectedServices.map(s => s.id);
    this.delete(idsToDelete);
  } else if (this.selectedServiceToDelete) {
    const idToDelete = this.selectedServiceToDelete;
    this.delete([idToDelete]);
  }
}

  toggleSelection(service: Service) {
    const index = this.selectedServices.indexOf(service);
    if (index > -1) {
      this.selectedServices.splice(index, 1); 
    } else {
      this.selectedServices.push(service);
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.services.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.services.length} entrées`;
  }
 


}
