import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Equipement } from 'src/app/models/equipement';
import { ServicesEquipementservice } from 'src/app/Services/Service-equipements/services-equipements.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Site } from 'src/app/models/site';
import { Secteur } from 'src/app/models/Secteur';

declare var window: any;

@Component({
  selector: 'app-list-equipements',
  templateUrl: './list-equipements.component.html',
  styleUrls: ['./list-equipements.component.css']
})
export class ListEquipementsComponent implements OnInit {
  sites: any[] = [];
  secteurs: any[] = [];
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any;
  @ViewChild('siteModal', { static: true }) siteModal:any;
  @ViewChild('secteurModal', { static: true }) secteurModal:any;
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.equipements.length / this.itemsPerPage);
  }

  get displayedEquipements(): Equipement[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.equipements.slice(startIndex, endIndex);
  }
  id : any 
  site : any 
  secteur : any 
  site_name : any
  secteur_name : any  
  type_equipement : any  
  codification : any  
  date_mise_en_service :any
  date_modification:any
  verification:any
  prochaine_verification:any
  commentaires:any
  Equipement_declasse:any
  N_serie:any
  Certificat:any
  searchQuery: string = '';
  equipements : Equipement[] = []
  
  deleteModal: any;
  idTodelete: number = 0;

  form = new FormGroup({
    site: new FormControl(''),
    secteur: new FormControl(''),
    type_equipement: new FormControl('', [Validators.minLength(3)]),
    codification: new FormControl('', [ Validators.minLength(3)]),
    date_mise_en_service: new FormControl('',[Validators.required]),
    date_modification: new FormControl(''),
    verification: new FormControl('',[Validators.minLength(3)]),
    prochaine_verification: new FormControl('',[Validators.minLength(4)]),
    commentaires: new FormControl('',[Validators.minLength(3)]),
    N_serie: new FormControl(''),
    Certificat: new FormControl(''),
    Equipement_declasse: new FormControl(''),


  });
  selectedSite: Site | undefined;
  selectedSecteur: Secteur | undefined;
  constructor(private   equipementservice : ServicesEquipementservice, private router : Router,private apiSiteService :ApiSiteService, private apiSecteurService :SecteurService, private bsModalService: BsModalService){

  }
  ngOnInit(): void {
    this.apiSiteService.getAllSite().subscribe(
      (data: any[]) => {
        this.sites = data;
        console.log(this.sites); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
    this.apiSecteurService.getSecteur().subscribe(
      (data: any[]) => {
        this.secteurs = data;
        console.log(this.secteurs); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
    this.getEquipements();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 
  }
  getEquipements() {
    this.equipementservice.getAll().subscribe(
      res => {
        this.equipements = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  navigateToEquipement() {
    this.router.navigate(['/add-equipements']);
  }
  updateEquipement() : void {
    const formData =  new FormData()
    formData.append("site", this.site);
    formData.append("secteur", this.secteur);
    formData.append("type_equipement", this.type_equipement);
    formData.append("codification", this.codification);
    if (this.date_mise_en_service !== null && this.date_mise_en_service !== undefined) {
      formData.append("date_mise_en_service", this.date_mise_en_service);
  }            
  if (this.date_modification !== null && this.date_modification !== undefined) {
    formData.append("date_modification", this.date_modification);
}    
    formData.append("verification", this.verification);
    if (this.prochaine_verification !== null && this.prochaine_verification !== undefined) {
      formData.append("prochaine_verification", this.prochaine_verification);
  }      
    formData.append("commentaires", this.commentaires);
    formData.append("N_serie", this.N_serie);
    if (this.Certificat !== null && this.Certificat !== undefined) {
      formData.append("Certificat", this.Certificat);
  }        formData.append("Equipement_declasse", this.Equipement_declasse);

  this.equipementservice.update(this.id, formData)

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
updateFile(event: any) {
  const file = event.target.files[0];
  this.Certificat=file

}
download(Certificat: string): void {
  this.equipementservice.downloadFile(Certificat);
}
getEquipementData( id : number,
  site : any,
  secteur : any,
  type_equipement : any  ,
  codification : any , 
  date_mise_en_service :any,
  date_modification:any,
  verification:any,
  prochaine_verification:any,
  commentaires:any,
  Equipement_declasse:any,
  N_serie:any,
){
  this.id = id,
  this.site=site,
  this.secteur = secteur,
  this.type_equipement = type_equipement,
  this.codification=codification,

  this.date_mise_en_service=date_mise_en_service,
  this.date_modification=date_modification
  this.verification=verification,
  this.prochaine_verification=prochaine_verification,
  this.commentaires=commentaires,
  this.Equipement_declasse=Equipement_declasse,
  this.N_serie=N_serie

}
openDeleteModal(id: number) {
  this.idTodelete = id;
  this.deleteModal.show();
}


delete() {
  this.equipementservice.delete(this.idTodelete).subscribe({
    next: (data) => {
      this.equipements = this.equipements.filter(_ => _.id != this.idTodelete)
      location.reload()
      this.deleteModal.hide();
    },
    error:(err) => {
      console.log(err);
    }


    
  });
}
openModal() {
  this.modalRef = this.bsModalService.show(this.successModal);
}
closeModal() {
  this.bsModalService.hide();
  location.reload();
}
openSiteModal(site: Site) {
  this.selectedSite = site;
  this.modalRef = this.bsModalService.show(this.siteModal);
}
closeModalsite(){
    this.bsModalService.hide();
}
openSecteurModal(secteur: Secteur) {
  this.selectedSecteur = secteur;
  this.modalRef = this.bsModalService.show(this.secteurModal);
}
closeModalsecteur(){
    this.bsModalService.hide();
}
getSelectedCertificatFileName(): string {
  const fileInput = document.getElementById('customFile2') as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    return fileInput.files[0].name;
  }
  return 'Choose file';
}
resetSearchQuery() {
  this.searchQuery = '';
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.equipements.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.equipements.length} entrées`;
}



}

