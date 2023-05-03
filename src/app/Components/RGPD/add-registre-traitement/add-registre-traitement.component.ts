import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceRegistreTraitementService } from 'src/app/Services/Service-registre-traitement/service-registre-traitement.service';
import { FournisseurService } from 'src/app/Services/Service-fournisseurs/fournisseur.service';
declare var window: any;

@Component({
  selector: 'app-add-registre-traitement',
  templateUrl: './add-registre-traitement.component.html',
  styleUrls: ['./add-registre-traitement.component.css']
})
export class AddRegistreTraitementComponent implements OnInit {
  fournisseurs: any[] = [];
  traitements: any[] = [];
  modalCompleted = false;


    @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   traitementservice : ServiceRegistreTraitementService , private router : Router, private   fournisseurservice : FournisseurService,private bsModalService: BsModalService){}

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
    donneesensible:'',
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
    modalForm = new FormGroup({
      mtypedemesuredesecurite: new FormControl('', Validators.required),
    });
    
    form = new FormGroup({
      fournisseur: new FormControl(''),
      typeregistre: new FormControl(''),
      nomtraitement: new FormControl(''),
      description_generale: new FormControl(''),
      datedecreation: new FormControl(''),
      datedemiseajour: new FormControl(''),
      responsable_traitement: new FormControl(''),
      finaliteprincipale: new FormControl(''),
      sous_finalite1: new FormControl(''),
      sous_finalite2: new FormControl(''),
      sous_finalite3: new FormControl(''),
      sous_finalite4: new FormControl(''),
      donneesensible: new FormControl(''),
      type_donnee: new FormControl(''),
      categorie: new FormControl(''),
      description: new FormControl(''),
      dureedeconcesrvation: new FormControl(''),
      personneconcernees: new FormControl(''),
      precisions: new FormControl(''),
      typedestinataire: new FormControl(''),
      precision: new FormControl(''),
      donneeconcernees: new FormControl(''),
      mtypedemesuredesecurite: new FormControl(''),      
      destinataire: new FormControl(''),
      pays: new FormControl(''),
      typedegarantie: new FormControl(''),
      lienversladocumentation: new FormControl(''),
      lesdonneesconcernee: new FormControl(''),
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
    this.traitementservice.getAll().subscribe(
      (data: any[]) => {
        this.traitements = data;
        console.log(this.traitements); // Print the sites to the console
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
    formData.append('donneesensible', this.traitementf.donneesensible);
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
    this.modalCompleted = false;
    return;
  }
  this.modalCompleted = true;
  const newOption = { mtypedemesuredesecurite: this.traitementf.mtypedemesuredesecurite };
  this.traitements.push(newOption);
  this.traitementf.mtypedemesuredesecurite = ''; // clear the modal form input
}
submitModalDonneeSensible() {
  if (!this.traitementf.type_donnee) {
    this.modalCompleted = false;
    return;
  }
  this.modalCompleted = true;
  const newOption = { type_donnee: this.traitementf.type_donnee };
  this.traitements.push(newOption);
  this.traitementf.type_donnee = ''; // clear the modal form input
}
submitModalPersonneconcernee() {
  if (!this.traitementf.personneconcernees) {
    this.modalCompleted = false;
    return;
  }
  this.modalCompleted = true;
  const newOption = { personneconcernees: this.traitementf.personneconcernees };
  this.traitements.push(newOption);
  this.traitementf.personneconcernees = ''; // clear the modal form input
}
submitModalDestinataire() {
  if (!this.traitementf.typedestinataire) {
    this.modalCompleted = false;
    return;
  }
  this.modalCompleted = true;
  const newOption = { typedestinataire: this.traitementf.typedestinataire };
  this.traitements.push(newOption);
  this.traitementf.typedestinataire = ''; // clear the modal form input
}
submitModalDestinataireenUE() {
  if (!this.traitementf.destinataire) {
    this.modalCompleted = false;
    return;
  }
  this.modalCompleted = true;
  const newOption = { destinataire: this.traitementf.destinataire };
  this.traitements.push(newOption);
  this.traitementf.destinataire = ''; // clear the modal form input
}

onCancel() {
  this.mode = 'list';
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
}
