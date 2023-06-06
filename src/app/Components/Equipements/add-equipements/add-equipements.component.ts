import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesEquipementservice } from 'src/app/Services/Service-equipements/services-equipements.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';

@Component({
  selector: 'app-add-equipements',
  templateUrl: './add-equipements.component.html',
  styleUrls: ['./add-equipements.component.css']
})
export class AddEquipementsComponent implements OnInit {
  sites: any[] = [];
  secteurs: any[] = [];
  droppedFile: File | null = null;
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   equipementservice : ServicesEquipementservice , private router : Router, private apiSiteService :ApiSiteService,private apiSecteurService: SecteurService,private bsModalService: BsModalService){}
  mode = 'list';
  equipementf = {
    id: 1,
    site: '',
    secteur: '',
    type_equipement:'',
    codification:'',
    date_mise_en_service:'',
    date_modification:'',

    verification:'',
    prochaine_verification:'',
    commentaires:'',
    Equipement_declasse:false,
    N_serie:'',
    Certificat:'',


  };

  submitted = false;
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
    Equipement_declasse: new FormControl(false),


  });
  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }

    // aller en haut de la page
    window.scrollTo(0, 0);
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

  }
  createEquipement() {
    
    const formData =  new FormData()
    formData.append("site", this.equipementf.site);
    formData.append("secteur", this.equipementf.secteur);
    formData.append("type_equipement", this.equipementf.type_equipement);
    formData.append("codification", this.equipementf.codification);
    formData.append("date_mise_en_service", this.equipementf.date_mise_en_service);
    formData.append("date_modification", this.equipementf.date_modification);
    formData.append("verification", this.equipementf.verification);
    formData.append("prochaine_verification", this.equipementf.prochaine_verification);
    formData.append("commentaires", this.equipementf.commentaires);
    formData.append("N_serie", this.equipementf.N_serie);
    formData.append("Certificat", this.equipementf.Certificat);
    formData.append("Equipement_declasse", this.equipementf.Equipement_declasse.toString());


    this.equipementservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/equipement-list"])
        this.openModal();
        console.log(formData);
        this.submitted = true;
      },
      error: (e)  =>{  
      console.error(e);
      this.submitted = false;
    }
  })
}

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.droppedFile = file;
    this.equipementf.Certificat=file

  }
  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}
onDragOver(event: any) {
  event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.dropEffect = 'copy';
}

onDragLeave(event: any) {
  event.preventDefault();
  event.stopPropagation();
}

onDrop(event: any) {
  event.preventDefault();
  event.stopPropagation();
  const file = event.dataTransfer.files[0];
  this.droppedFile = file;
  this.equipementf.Certificat=file;
  const dropZone = document.querySelector('.drop-zone');
  if (dropZone) {
    dropZone.innerHTML = file.name;
  }
  
}
}
