import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceRegistreTraitementService } from 'src/app/Services/Service-registre-traitement/service-registre-traitement.service';
import { FournisseurService } from 'src/app/Services/Service-fournisseurs/fournisseur.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
declare var window: any;

@Component({
  selector: 'app-add-registre-traitement',
  templateUrl: './add-registre-traitement.component.html',
  styleUrls: ['./add-registre-traitement.component.css']
})
export class AddRegistreTraitementComponent implements OnInit {
  fournisseurs: any[] = [];
  traitements: any[] = [];
  utilisateurs: any[] = [];
  modalCompletedmesure = false;
  modalCompleteddonnee = false;
  modalCompletedpersonne = false;
  modalCompletedenUE = false;
  modalCompletedhorsUE = false;

    @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   traitementservice : ServiceRegistreTraitementService , private router : Router, private   fournisseurservice : FournisseurService,private apiUtilisateurService: ApiUtilisateurService,private bsModalService: BsModalService){}

  mode = 'list';
  
  traitementf = {
    id: 1,
    fournisseur: '',
    typeregistre:'',
    nomtraitement: '',
    description_generale:'',
    datedecreation: '',
    datedemiseajour: '',
    responsable_traitement:'',
    finaliteprincipale: '',
    sous_finalite1: '',
    sous_finalite2: '',
    sous_finalite3: '',
    sous_finalite4: '',
    donneesensible:false,
    type_donnee:'',
    categorie: '',
    description: '',
    dureedeconcesrvation: '',
    personneconcernees:'',
    precisions:'',
    typedestinataire:'',
    precision:'',
    donneeconcernees:'',
    mtypedemesuredesecurite: '',
    destinataire: '',
    pays: '',
    typedegarantie: '',
    lienversladocumentation: '',
    lesdonneesconcernee: '',
    fournisseur_dpo:'',
    fournisseur_representant:''
  };
    submitted = false;
    
    form = new FormGroup({
      fournisseur: new FormControl(''),
      typeregistre: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
      nomtraitement: new FormControl('', [Validators.minLength(3),Validators.maxLength(40),this.checkDuplicateNomTraitement.bind(this)]),
      description_generale: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      datedecreation: new FormControl(''),
      datedemiseajour: new FormControl(''),
      responsable_traitement: new FormControl(''),
      finaliteprincipale: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      sous_finalite1: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      sous_finalite2: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      sous_finalite3: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      sous_finalite4: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      donneesensible: new FormControl(false),
      type_donnee: new FormControl(''),
      categorie: new FormControl(''),
      description: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      dureedeconcesrvation: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
      personneconcernees: new FormControl(''),
      precisions: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      typedestinataire: new FormControl(''),
      precision: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      donneeconcernees: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      mtypedemesuredesecurite: new FormControl(''),      
      destinataire: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      pays: new FormControl(''),
      typedegarantie: new FormControl(''),
      lienversladocumentation: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      lesdonneesconcernee: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
      fournisseur_dpo: new FormControl(''),
      fournisseur_representant: new FormControl('')


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
    this.fournisseurservice.getAll().subscribe(
      (data: any[]) => {
        this.fournisseurs = data;
        console.log(this.fournisseurs); // Print the sites to the console
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
    this.traitementservice.getAll().subscribe(
      (data: any[]) => {
        this.traitements = data;
        console.log(this.traitements); 
        this.modalCompletedmesure = this.hasValuesForField('mtypedemesuredesecurite');
        this.modalCompleteddonnee = this.hasValuesForField('type_donnee');
        this.modalCompletedpersonne = this.hasValuesForField('personneconcernees');
        this.modalCompletedenUE = this.hasValuesForField('typedestinataire');
        this.modalCompletedhorsUE = this.hasValuesForField('destinataire'); 


      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
  }
  createTraitement() {
    const formData = new FormData();
    formData.append('fournisseur', this.traitementf.fournisseur);
    formData.append('typeregistre', this.traitementf.typeregistre);
    formData.append('nomtraitement', this.traitementf.nomtraitement);
    formData.append('datedecreation', this.traitementf.datedecreation);
    formData.append('datedemiseajour', this.traitementf.datedemiseajour);
    formData.append('description_generale', this.traitementf.description_generale);
    formData.append('responsable_traitement', this.traitementf.responsable_traitement);
    formData.append('precision', this.traitementf.precision);
    formData.append('finaliteprincipale', this.traitementf.finaliteprincipale);
    formData.append('sous_finalite1', this.traitementf.sous_finalite1);
    formData.append('sous_finalite2', this.traitementf.sous_finalite2);
    formData.append('sous_finalite3', this.traitementf.sous_finalite3);
    formData.append('sous_finalite4', this.traitementf.sous_finalite4);
    formData.append('donneesensible', this.traitementf.donneesensible.toString());
    formData.append('type_donnee', this.traitementf.type_donnee);
    formData.append('categorie', this.traitementf.categorie);
    formData.append('description', this.traitementf.description);
    formData.append('dureedeconcesrvation', this.traitementf.dureedeconcesrvation);
    formData.append('personneconcernees', this.traitementf.personneconcernees);
    formData.append('precisions', this.traitementf.precisions);
    formData.append('typedestinataire', this.traitementf.typedestinataire);
    formData.append('precision', this.traitementf.precision);
    formData.append('donneeconcernees', this.traitementf.donneeconcernees);
    formData.append('mtypedemesuredesecurite', this.traitementf.mtypedemesuredesecurite);
    formData.append('destinataire', this.traitementf.destinataire);
    formData.append('pays', this.traitementf.pays);
    formData.append('typedegarantie', this.traitementf.typedegarantie);
    formData.append('lienversladocumentation', this.traitementf.lienversladocumentation);
    formData.append('lesdonneesconcernee', this.traitementf.lesdonneesconcernee);
    formData.append('fournisseur_dpo', this.traitementf.fournisseur_dpo);
    formData.append('fournisseur_representant', this.traitementf.fournisseur_representant);


    this.traitementservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/list-registre-traitement"])
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
submitModalMesure() {
  if (!this.traitementf.mtypedemesuredesecurite) {
    this.modalCompletedmesure = false;
    return;
  }
  const existingOption = this.traitements.find(traitement => traitement.mtypedemesuredesecurite === this.traitementf.mtypedemesuredesecurite);
  if (!existingOption) {
    const newOption = { mtypedemesuredesecurite: this.traitementf.mtypedemesuredesecurite };
    this.traitements.push(newOption);
  }
  this.modalCompletedmesure = true;
  this.traitementf.mtypedemesuredesecurite='';
}
submitModalDonneeSensible() {
  if (!this.traitementf.type_donnee) {
    this.modalCompleteddonnee = false;
    return;
  }
  const existingOption = this.traitements.find(traitement => traitement.type_donnee === this.traitementf.type_donnee);
  if (!existingOption) {
    const newOption = { type_donnee: this.traitementf.type_donnee };
    this.traitements.push(newOption);
  }
  this.modalCompleteddonnee = true;
  this.traitementf.type_donnee='';

}
submitModalPersonneconcernee() {
  if (!this.traitementf.personneconcernees) {
    this.modalCompletedpersonne = false;
    return;
  }
  const existingOption = this.traitements.find(traitement => traitement.personneconcernees === this.traitementf.personneconcernees);
  if (!existingOption) {
    const newOption = { personneconcernees: this.traitementf.personneconcernees };
    this.traitements.push(newOption);
  }
  this.modalCompletedpersonne = true;
  this.traitementf.personneconcernees='';

}
submitModalDestinataire() {
  if (!this.traitementf.typedestinataire) {
    this.modalCompletedenUE = false;
    return;
  }
  const existingOption = this.traitements.find(traitement => traitement.typedestinataire === this.traitementf.typedestinataire);
  if (!existingOption) {
    const newOption = { typedestinataire: this.traitementf.typedestinataire };
    this.traitements.push(newOption);
  }
  this.modalCompletedenUE = true;
  this.traitementf.typedestinataire='';

}
submitModalDestinataireenUE() {
  if (!this.traitementf.destinataire) {
    this.modalCompletedhorsUE = false;
    return;
  }
  const existingOption = this.traitements.find(traitement => traitement.destinataire === this.traitementf.destinataire);
  if (!existingOption) {
    const newOption = { destinataire: this.traitementf.destinataire };
    this.traitements.push(newOption);
  }
  this.modalCompletedhorsUE = true;
  this.traitementf.destinataire='';

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
hasValuesForField(fieldName: string): boolean {
  return this.traitements.some(traitement => !!traitement[fieldName]);
}
checkDuplicateNomTraitement(control: AbstractControl): { [key: string]: boolean } | null {
  const nomtraitementValue = control.value;
  const isDuplicate = this.traitements.some(item => item.nomtraitement === nomtraitementValue);
  return isDuplicate ? { 'duplicate': true } : null;
}
closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
  }, 2300); 
}
}
