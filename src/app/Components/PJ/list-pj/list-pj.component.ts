import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { PjService } from 'src/app/Services/Service-pj/pj.service';
import { Personnel } from 'src/app/models/Personnel';
import { Pj } from 'src/app/models/pj';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-list-pj',
  templateUrl: './list-pj.component.html',
  styleUrls: ['./list-pj.component.css']
})
export class ListPjComponent {
  pj: Pj[] = [];
  //filtrage 
  myForm: any;
  selectedPersonnelId: number | undefined;
  personnel$!: Observable<any>;
  //search
  searchQuery: string = '';

  //modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  @ViewChild('userModal') userModal!: TemplateRef<any>; // reference to the user modal template
  modalRef!: BsModalRef;
  pjIdToDelete: number = 0;
  personnel!: Personnel;

  personnelDetails: {
    personnel: Personnel | null,
    selectedPersonnelName: string
  };
  

  constructor(
    private pjService: PjService,
    public modalService: BsModalService, 
    private personnelService: PersonnelService
  ) {
    this.personnelDetails = {
      personnel: null,
      selectedPersonnelName: ''
    };
  }

  ngOnInit(): void {
    this.loadPJs();
    this.myForm = new FormGroup({
      site: new FormControl(),
     
    });
       //pagination 
       this.itemsPerPageOptions = [5, 10, 15];
       this.itemsPerPage = this.itemsPerPageOptions[0];
    
  }

  loadPJs(): void {
    this.pjService.getPjs().subscribe(
      (data: Pj[]) => {
        this.pj = data;
      }
    );
  }

  deletePj(id: number): void {
    this.pjService.deletePj(id).subscribe(() => {
      this.pj = this.pj.filter((p) => p.id !== id);
    });
  }

  //delete modal
  confirmDelete(): void {
    this.pjService.deletePj(this.pjIdToDelete).subscribe(() => {
      this.pj = this.pj.filter(p => p.id !== this.pjIdToDelete);
      this.modalRef.hide();
    });
  }

  declineDelete(): void {
    this.modalRef.hide();
  }

  //function to open user modal and pass the user information
  openModal(pj: Pj): void {
    this.personnelService.getPersonnelById(pj.modifie_par).subscribe(
      (personnel: Personnel) => {
        this.personnel = personnel;
        this.modalRef = this.modalService.show(this.userModal);
      }
    );
  }
//search 
  resetSearchQuery() {
    this.searchQuery = '';
  }
  
//pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.pj.length / this.itemsPerPage);
}

get displayedPJs(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.pj.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.pj.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.pj.length} entrées`;
}
}
