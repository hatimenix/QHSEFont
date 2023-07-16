import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Personnel } from 'src/app/models/Personnel';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-list-site',
  templateUrl: './list-site.component.html',
  styleUrls: ['./list-site.component.css']
})
export class ListSiteComponent implements OnInit {
  site: Site[] = [];
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
  siteIdToDelete: number = 0;
  personnel!: Personnel;

  personnelDetails: {
    personnel: Personnel | null,
    selectedPersonnelName: string
  };
  

  constructor(
    private siteService: ApiSiteService,
    public modalService: BsModalService, 
    private personnelService: PersonnelService
  ) {
    this.personnelDetails = {
      personnel: null,
      selectedPersonnelName: ''
    };
  }

  ngOnInit(): void {
    this.loadSites();
    this.myForm = new FormGroup({
      site: new FormControl(),
     
    });
    //pagination
this.itemsPerPageOptions = [5, 10, 15];
this.itemsPerPage = this.itemsPerPageOptions[0]; 
  }

  loadSites(): void {
    this.siteService.getAllSite().subscribe(
      (data: Site[]) => {
        this.site = data;
      }
    );
  }

  deleteSite(id: number): void {
    this.siteService.deleteSite(id).subscribe(() => {
      this.site = this.site.filter((p) => p.id !== id);
    });
  }

  //delete modal
  confirmDelete(): void {
    this.siteService.deleteSite(this.siteIdToDelete).subscribe(() => {
      this.site = this.site.filter(s => s.id !== this.siteIdToDelete);
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

//pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.site.length / this.itemsPerPage);
}

get displayedSites(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.site.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.site.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.site.length} entrées`;
}

}
