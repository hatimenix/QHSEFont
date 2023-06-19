import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { PjService } from 'src/app/Services/Service-pj/pj.service';
import { RapportAuditService } from 'src/app/Services/Service-rapport-audit/rapport-audit.service';
import { Personnel } from 'src/app/models/Personnel';
import { Pj } from 'src/app/models/pj';
import { RapportAudit } from 'src/app/models/rapportAudit';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-list-rapport-audit',
  templateUrl: './list-rapport-audit.component.html',
  styleUrls: ['./list-rapport-audit.component.css']
})
export class ListRapportAuditComponent {
  rapportAudit: RapportAudit[] = [];
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
  rpIdToDelete: number = 0;
  personnel!: Personnel;

  personnelDetails: {
    personnel: Personnel | null,
    selectedPersonnelName: string
  };
  

  constructor(
    private rapportService: RapportAuditService,
    public modalService: BsModalService, 
    private personnelService: PersonnelService
  ) {
    this.personnelDetails = {
      personnel: null,
      selectedPersonnelName: ''
    };
  }

  ngOnInit(): void {
    this.loadRapports();
    this.myForm = new FormGroup({
      site: new FormControl(),
     
    });
     //pagination 
     this.itemsPerPageOptions = [5, 10, 15];
     this.itemsPerPage = this.itemsPerPageOptions[0];
    
  }

  loadRapports(): void {
    this.rapportService.getRapport().subscribe(
      (data: RapportAudit[]) => {
        this.rapportAudit = data;
      }
    );
  }

  deleteRapport(id: number): void {
    this.rapportService.deleteRapport(id).subscribe(() => {
      this.rapportAudit = this.rapportAudit.filter((r) => r.id !== id);
    });
  }

  //delete modal
  confirmDelete(): void {
    this.rapportService.deleteRapport(this.rpIdToDelete).subscribe(() => {
      this.rapportAudit = this.rapportAudit.filter(p => p.id !== this.rpIdToDelete);
      this.modalRef.hide();
    });
  }

  declineDelete(): void {
    this.modalRef.hide();
  }

  //function to open user modal and pass the user information
  openModal(rapportAudit: RapportAudit): void {
    this.personnelService.getPersonnelById(rapportAudit.modifie_par).subscribe(
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
  return Math.ceil(this.rapportAudit.length / this.itemsPerPage);
}

get displayedRapports(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.rapportAudit.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.rapportAudit.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.rapportAudit.length} entrées`;
}

}
