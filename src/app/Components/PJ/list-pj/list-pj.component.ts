import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { PjService } from 'src/app/Services/Service-pj/pj.service';
import { Personnel } from 'src/app/models/Personnel';
import { Pj } from 'src/app/models/pj';
import { Site } from 'src/app/models/site';

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
