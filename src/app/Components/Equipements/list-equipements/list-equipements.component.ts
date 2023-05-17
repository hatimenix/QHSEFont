import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Equipement } from 'src/app/models/equipement';
import { ServicesEquipementservice } from 'src/app/Services/Service-equipements/services-equipements.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare var window: any;

@Component({
  selector: 'app-list-equipements',
  templateUrl: './list-equipements.component.html',
  styleUrls: ['./list-equipements.component.css']
})
export class ListEquipementsComponent {
  sites: any[] = [];
  secteurs: any[] = [];
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any;
  
  modalRef!: BsModalRef;
  p = 1; 
  itemsPerPage: number = 10;
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
    formData.append("date_mise_en_service", this.date_mise_en_service);
    formData.append("date_modification", this.date_modification);
    formData.append("verification", this.verification);
    formData.append("prochaine_verification", this.prochaine_verification);
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
  site_name : any,
  secteur_name : any , 
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
  this.site_name = site_name,
  this.secteur_name = secteur_name,
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
}

