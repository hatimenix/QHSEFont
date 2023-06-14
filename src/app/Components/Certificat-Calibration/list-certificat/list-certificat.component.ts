import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CertificatService } from 'src/app/Services/Service-Certificat/certificat.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { CertificatCalibration } from 'src/app/models/CertificatCalibration';
import { Personnel } from 'src/app/models/Personnel';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-list-certificat',
  templateUrl: './list-certificat.component.html',
  styleUrls: ['./list-certificat.component.css']
})
export class ListCertificatComponent {
  certificat: CertificatCalibration[] = [];
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
  certificatIdToDelete: number = 0;
  personnel!: Personnel;

  personnelDetails: {
    personnel: Personnel | null,
    selectedPersonnelName: string
  };
  

  constructor(
    private certificatService: CertificatService,
    public modalService: BsModalService, 
    private personnelService: PersonnelService
  ) {
    this.personnelDetails = {
      personnel: null,
      selectedPersonnelName: ''
    };
  }

  ngOnInit(): void {
    this.loadCertificats();
    this.myForm = new FormGroup({
      site: new FormControl(),
     
    });
    
  }

  loadCertificats(): void {
    this.certificatService.getCertificats().subscribe(
      (data: CertificatCalibration[]) => {
        this.certificat = data;
      }
    );
  }

  deletePj(id: number): void {
    this.certificatService.deleteCertificat(id).subscribe(() => {
      this.certificat = this.certificat.filter((c) => c.id !== id);
    });
  }

  //delete modal
  confirmDelete(): void {
    this.certificatService.deleteCertificat(this.certificatIdToDelete).subscribe(() => {
      this.certificat = this.certificat.filter(c => c.id !== this.certificatIdToDelete);
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
