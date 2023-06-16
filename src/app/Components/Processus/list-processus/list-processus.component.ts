import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';

import { Personnel } from 'src/app/models/Personnel';

import { Processus } from 'src/app/models/pocesus';


@Component({
  selector: 'app-list-processus',
  templateUrl: './list-processus.component.html',
  styleUrls: ['./list-processus.component.css']
})
export class ListProcessusComponent implements OnInit {
  
  processus: Processus[] = [];

  //modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  @ViewChild('userModal') userModal!: TemplateRef<any>; // reference to the user modal template
  //search
  searchQuery: string = '';
  intitule:any;
  modalRef!: BsModalRef;
  ProIdToDelete: number = 0;
  personnel!: Personnel;

  personnelDetails: {
    personnel: Personnel | null;
    selectedPersonnelName: string;
  } 
constructor(private processusService: ProcessusService,
  private personnelService : PersonnelService,
  public modalService: BsModalService) { 
  this.personnelDetails = {
    personnel: null,
    selectedPersonnelName: ''
  };
}
ngOnInit(): void {

this.loadprocessus();
//pagination
this.itemsPerPageOptions = [5, 10, 15];
this.itemsPerPage = this.itemsPerPageOptions[0]; 
}
loadprocessus() {
this.processusService.getProcessus().subscribe(
(data: Processus[]) => {
this.processus = data;
}
)
}
deleteProcessus(id: number) :void{
  this.processusService.deleteProcessus(id).subscribe(() => {
    this.processus = this.processus.filter((p) => p.id !== id);
  });
}
 //delete modal
 confirmDelete(): void {
  this.processusService.deleteProcessus(this.ProIdToDelete)
    .subscribe(() => {
      this.processus = this.processus.filter(c => c.id !== this.ProIdToDelete);
      this.modalRef.hide();
    });
}

  declineDelete(): void {
  this.modalRef.hide();
  }

   //function to open user modal and pass the user information
   openUserModal(processus: Processus): void {
    const selectedPersonnelId = processus.pilote;
    const selectedPersonnelName = processus.pilote_name;
  
    console.log("Selected personnel ID: ", selectedPersonnelId);
    console.log("Selected personnel name: ", selectedPersonnelName);
  
    this.personnelService.getPersonnelById(selectedPersonnelId).subscribe((personnel: Personnel) => {
      console.log("Personnel details: ", personnel);
      this.personnelDetails.personnel = personnel;
      console.log("Personnel details after setting: ", this.personnelDetails);

      this.modalRef = this.modalService.show(this.userModal);
    });
  }
  resetSearchQuery() {
    this.searchQuery = '';
  }

  //pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.processus.length / this.itemsPerPage);
}

get displayedProcessus(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.processus.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.processus.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.processus.length} entrées`;
}
}
