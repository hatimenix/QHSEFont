import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CertificatService } from 'src/app/Services/Service-Certificat/certificat.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { CertificatCalibration } from 'src/app/models/CertificatCalibration';
import { Personnel } from 'src/app/models/Personnel';
import { Site } from 'src/app/models/Site';

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
      //pagination 
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];
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

 
//search 
  resetSearchQuery() {
    this.searchQuery = '';
  }
  

  openModal(certificat: CertificatCalibration): void {
    this.personnelService.getPersonnelById(certificat.modifie_par).subscribe(
      (personnel: Personnel) => {
        this.personnel = personnel;
        this.modalRef = this.modalService.show(this.userModal);
      }
    );
  }
  //pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.certificat.length / this.itemsPerPage);
}

get displayedCertificats(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.certificat.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.certificat.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.certificat.length} entrées`;
}
}
