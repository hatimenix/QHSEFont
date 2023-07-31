import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';

import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-nc',
  templateUrl: './add-nc.component.html',
  styleUrls: ['./add-nc.component.css']
})
export class AddNcComponent implements OnInit {
  ncs: any[] = [];
  sites: any[] = [];
  processuss: any[] = [];
  utilisateurs: any[] = [];
  droppedFile: File | null = null;
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   ncservice : ServicesNonConfirmitéService , private router : Router,private apiProcessusService :ProcessusService,private apiSiteService :ApiSiteService,private apiUtilisateurService: ApiUtilisateurService,private bsModalService: BsModalService){}

  mode = 'list';
  ncf = {
    id: 1,
    intitule: '',
    nature: '',
    domaine:'',
    detail_cause:'',
    date_nc:'',
    date_prise_en_compte:'',
    description_detailee:'',

    annee:'',
    mois:'',
    delai_prevu:'',
    type_cause:'',
    cout:'',
    progress:'',
    info_complementaires:'',
    frequence:false,
    gravite:false,
    action_immediate:false,
    nc_cloture:false,
    piece_jointe:'',
    processus:'',
    site:'',
    responsable_traitement:''


  };

  submitted = false;
  form = new FormGroup({
    intitule: new FormControl('', [Validators.minLength(3),Validators.maxLength(40),this.checkDuplicateintitule.bind(this)]),
    nature: new FormControl('', [Validators.required, Validators.minLength(3)]),
    domaine: new FormControl('', [Validators.minLength(3)]),
    detail_cause: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    date_nc: new FormControl('',[Validators.required]),
    date_prise_en_compte: new FormControl(''),
    description_detailee: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    annee: new FormControl('',[Validators.minLength(4)]),
    mois: new FormControl('',[Validators.minLength(3)]),
    delai_prevu: new FormControl(''),
    type_cause: new FormControl('',[Validators.required]),
    cout: new FormControl(''),
    progress: new FormControl(''),
    info_complementaires: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    frequence: new FormControl(false,[Validators.required]),
    gravite: new FormControl(false),
    action_immediate: new FormControl(false),
    nc_cloture: new FormControl(false),
    piece_jointe: new FormControl(''),
    processus: new FormControl(''),
    site: new FormControl(''),
    responsable_traitement: new FormControl('')

    

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
    this.apiProcessusService.getProcessus().subscribe(
      (data: any[]) => {
        this.processuss = data;
        console.log(this.processuss); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
    this.apiUtilisateurService.getAllUtilsateur().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    ); 
    this.ncservice.getAll().subscribe(
      (data: any[]) => {
        this.ncs = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
  }
  createNC() {
    
    const formData =  new FormData()
    formData.append("intitule", this.ncf.intitule);
    formData.append("nature", this.ncf.nature);
    formData.append("domaine", this.ncf.domaine);
    formData.append("detail_cause", this.ncf.detail_cause);
    formData.append("date_nc", this.ncf.date_nc);
    formData.append("date_prise_en_compte", this.ncf.date_prise_en_compte);
    formData.append("description_detailee", this.ncf.description_detailee);
    formData.append("annee", this.ncf.annee);
    formData.append("mois", this.ncf.mois);
    formData.append("delai_prevu", this.ncf.delai_prevu);
    formData.append("type_cause", this.ncf.type_cause);
    formData.append("cout", this.ncf.cout);
    formData.append("progress", this.ncf.progress);
    formData.append("info_complementaires", this.ncf.info_complementaires);
    formData.append("frequence", this.ncf.frequence.toString());
    formData.append("gravite", this.ncf.gravite.toString());
    formData.append("action_immediate", this.ncf.action_immediate.toString());
    formData.append("nc_cloture", this.ncf.nc_cloture.toString());
    formData.append("piece_jointe", this.ncf.piece_jointe);
    formData.append("processus", this.ncf.processus);
    formData.append("site", this.ncf.site);
    formData.append("responsable_traitement", this.ncf.responsable_traitement);


    this.ncservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/nc-list"])
        this.openModal();
        this.closeSuccessModalAfterDelay();
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
    this.ncf.piece_jointe=file

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
  this.ncf.piece_jointe=file;
  const dropZone = document.querySelector('.drop-zone');
  if (dropZone) {
    dropZone.innerHTML = file.name;
  }
  
}
checkDuplicateintitule(control: AbstractControl): { [key: string]: boolean } | null {
  const intituleValue = control.value;
  const isDuplicate = this.ncs.some(item => item.intitule === intituleValue);
  return isDuplicate ? { 'duplicate': true } : null;
}
closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
  }, 2300); 
}
}

