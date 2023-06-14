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
  openUserModal(site: Site): void {
    const selectedPersonnelId = site.responsable_site;
    const selectedPersonnelName = site.responsable_name;
  
    console.log("Selected personnel ID: ", selectedPersonnelId);
    console.log("Selected personnel name: ", selectedPersonnelName);
  
    this.personnelService.getPersonnelById(selectedPersonnelId).subscribe((personnel: Personnel) => {
      console.log("Personnel details: ", personnel);
      this.personnelDetails.personnel = personnel;
      console.log("Personnel details after setting: ", this.personnelDetails);

      this.modalRef = this.modalService.show(this.userModal);
    });
  }
//search 
  resetSearchQuery() {
    this.searchQuery = '';
  }
  
  

}
