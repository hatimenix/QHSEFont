import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceRegistreTraitementService } from 'src/app/Services/Service-registre-traitement/service-registre-traitement.service';
import { FournisseurService } from 'src/app/Services/Service-fournisseurs/fournisseur.service';

@Component({
  selector: 'app-add-registre-traitement',
  templateUrl: './add-registre-traitement.component.html',
  styleUrls: ['./add-registre-traitement.component.css']
})
export class AddRegistreTraitementComponent implements OnInit {
  fournisseurs: any[] = [];
  traitements: any[] = [];
  isAllMtypedemesuredesecuriteEmpty: boolean = false;
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   traitementservice : ServiceRegistreTraitementService , private router : Router, private   fournisseurservice : FournisseurService,private bsModalService: BsModalService){}

  mode = 'list';
  
  traitementf = {
    id: 1,
    fournisseur: '',
    REFtraitement: '',
    nomtraitement: '',
    datedecreation: '',
    datedemiseajour: '',
    donneesensible: '',
    personneconcernee: '',
    precision: '',
    typeregistre: '',
    finaliteprincipale: '',
    sous_finalite1: '',
    sous_finalite2: '',
    sous_finalite3: '',
    sous_finalite4: '',
    categorie: '',
    description: '',
    dureedeconcesrvation: '',
    mtypedemesuredesecurite: '',
    precisiondumesuredesecurite: '',
    typedestinataire: '',
    precisions: '',
    donneeconcernee: '',
    destinataire: '',
    pays: '',
    typedegarantie: '',
    lienversladocumentation: '',
    lesdonneesconcernee: '',
    prenomnomresptraitement: '',
    emailresptraitement: '',
    telephonereesptraitement: '',
    prenommomDPO: '',
    EmailDPO: '',
    telephoneDPO: '',
    prenomnomrepresentant: '',
    emailrepresentant: '',
    telephonerepresentant: ''
  };
    submitted = false;
    form = new FormGroup({
      fournisseur: new FormControl(''),
      REFtraitement: new FormControl(''),
      nomtraitement: new FormControl(''),
      datedecreation: new FormControl(''),
      datedemiseajour: new FormControl(''),
      donneesensible: new FormControl(''),
      personneconcernee: new FormControl(''),
      precision: new FormControl(''),
      typeregistre: new FormControl(''),
      finaliteprincipale: new FormControl(''),
      sous_finalite1: new FormControl(''),
      sous_finalite2: new FormControl(''),
      sous_finalite3: new FormControl(''),
      sous_finalite4: new FormControl(''),
      categorie: new FormControl(''),
      description: new FormControl(''),
      dureedeconcesrvation: new FormControl(''),
      mtypedemesuredesecurite: new FormControl(''),
      precisiondumesuredesecurite: new FormControl(''),
      typedestinataire: new FormControl(''),
      precisions: new FormControl(''),
      donneeconcernee: new FormControl(''),
      destinataire: new FormControl(''),
      pays: new FormControl(''),
      typedegarantie: new FormControl(''),
      lienversladocumentation: new FormControl(''),
      lesdonneesconcernee: new FormControl(''),
      prenomnomresptraitement: new FormControl(''),
      emailresptraitement: new FormControl(''),
      telephonereesptraitement: new FormControl(''),
      prenommomDPO: new FormControl(''),
      EmailDPO: new FormControl(''),
      telephoneDPO: new FormControl(''),
      prenomnomrepresentant: new FormControl(''),
      emailrepresentant: new FormControl(''),
      telephonerepresentant: new FormControl('')

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
    this.isAllMtypedemesuredesecuriteEmpty = this.traitements.every(traitement => !traitement.mtypedemesuredesecurite);

  }
  createTraitement() {
    const formData = new FormData();
    formData.append('fournisseur', this.traitementf.fournisseur);
    formData.append('REFtraitement', this.traitementf.REFtraitement);
    formData.append('nomtraitement', this.traitementf.nomtraitement);
    formData.append('datedecreation', this.traitementf.datedecreation);
    formData.append('datedemiseajour', this.traitementf.datedemiseajour);
    formData.append('donneesensible', this.traitementf.donneesensible);
    formData.append('personneconcernee', this.traitementf.personneconcernee);
    formData.append('precision', this.traitementf.precision);
    formData.append('typeregistre', this.traitementf.typeregistre);
    formData.append('finaliteprincipale', this.traitementf.finaliteprincipale);
    formData.append('sous_finalite1', this.traitementf.sous_finalite1);
    formData.append('sous_finalite2', this.traitementf.sous_finalite2);
    formData.append('sous_finalite3', this.traitementf.sous_finalite3);
    formData.append('sous_finalite4', this.traitementf.sous_finalite4);
    formData.append('categorie', this.traitementf.categorie);
    formData.append('description', this.traitementf.description);
    formData.append('dureedeconcesrvation', this.traitementf.dureedeconcesrvation);
    formData.append('mtypedemesuredesecurite', this.traitementf.mtypedemesuredesecurite);
    formData.append('precisiondumesuredesecurite', this.traitementf.precisiondumesuredesecurite);
    formData.append('typedestinataire', this.traitementf.typedestinataire);
    formData.append('precisions', this.traitementf.precisions);
    formData.append('donneeconcernee', this.traitementf.donneeconcernee);
    formData.append('destinataire', this.traitementf.destinataire);
    formData.append('pays', this.traitementf.pays);
    formData.append('typedegarantie', this.traitementf.typedegarantie);
    formData.append('lienversladocumentation', this.traitementf.lienversladocumentation);
    formData.append('lesdonneesconcernee', this.traitementf.lesdonneesconcernee);
    formData.append('prenomnomresptraitement', this.traitementf.prenomnomresptraitement);
    formData.append('emailresptraitement', this.traitementf.emailresptraitement);
    formData.append('telephonereesptraitement', this.traitementf.telephonereesptraitement);
    formData.append('prenommomDPO', this.traitementf.prenommomDPO);
    formData.append('EmailDPO', this.traitementf.EmailDPO);
    formData.append('telephoneDPO', this.traitementf.telephoneDPO);
    formData.append('prenomnomrepresentant', this.traitementf.prenomnomrepresentant);
    formData.append('emailrepresentant', this.traitementf.emailrepresentant);
    formData.append('telephonerepresentant', this.traitementf.telephonerepresentant);

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
onSelectionChange() {
  this.isAllMtypedemesuredesecuriteEmpty = !this.traitementf.mtypedemesuredesecurite;
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
