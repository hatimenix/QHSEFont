import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FournisseurService } from 'src/app/Services/Service-fournisseurs/fournisseur.service';
@Component({
  selector: 'app-add-fournisseurs',
  templateUrl: './add-fournisseurs.component.html',
  styleUrls: ['./add-fournisseurs.component.css']
})
export class AddFournisseursComponent implements OnInit {
  fournisseurs: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   fournisseurservice : FournisseurService , private router : Router, private bsModalService: BsModalService){}
  mode = 'list';
  fournisseurf = {
    id: 1,
    nom: '',
    numerodesiret: '',
    type_de_prestation:'',
    numero_de_recepisse_de_declaration_prefectorale:'',
    pageweb:'',
    telephone:'',
    numerodetelecopie:'',
    adresse:'',
    codepostal:'',
    ville:'',
    pays:'',
    nometprenom:'',
    adressedecourier:'',
    fonction:'',
    numerodetelephone:'',
    telephonepersonnel:'',

  };

  submitted = false;
  form = new FormGroup({
    nom: new FormControl('', [Validators.minLength(3),Validators.maxLength(40),this.checkDuplicateNom.bind(this)]),
    numerodesiret: new FormControl('', [Validators.pattern(/^[0-9]\d*$/)]),
    type_de_prestation: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    numero_de_recepisse_de_declaration_prefectorale: new FormControl('', [Validators.pattern(/^[0-9]\d*$/)]),
    pageweb: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    telephone: new FormControl('', [Validators.pattern('^[+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4}$')]),
    numerodetelecopie: new FormControl('', [Validators.pattern(/^[0-9]\d*$/)]),
    adresse: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    codepostal: new FormControl('', [Validators.pattern(/^[0-9]\d*$/)]),
    ville: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    pays: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    nometprenom: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    adressedecourier: new FormControl('', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    fonction: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    numerodetelephone: new FormControl('', [Validators.pattern('^[+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4}$')]),
    telephonepersonnel: new FormControl('', [Validators.pattern('^[+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4}$')]),

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
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
  }
  createFournisseur() {
    
    const formData =  new FormData()
    formData.append("nom", this.fournisseurf.nom);
    formData.append("numerodesiret", this.fournisseurf.numerodesiret);
    formData.append("type_de_prestation", this.fournisseurf.type_de_prestation);
    formData.append("numero_de_recepisse_de_declaration_prefectorale", this.fournisseurf.numero_de_recepisse_de_declaration_prefectorale);
    formData.append("pageweb", this.fournisseurf.pageweb);
    formData.append("telephone", this.fournisseurf.telephone);
    formData.append("numerodetelecopie", this.fournisseurf.numerodetelecopie);
    formData.append("adresse", this.fournisseurf.adresse);
    formData.append("codepostal", this.fournisseurf.codepostal);
    formData.append("ville", this.fournisseurf.ville);
    formData.append("pays", this.fournisseurf.pays);
    formData.append("nometprenom", this.fournisseurf.nometprenom);
    formData.append("adressedecourier", this.fournisseurf.adressedecourier);
    formData.append("fonction", this.fournisseurf.fonction);
    formData.append("numerodetelephone", this.fournisseurf.numerodetelephone);
    formData.append("telephonepersonnel", this.fournisseurf.telephonepersonnel);



    this.fournisseurservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/fournisseur-list"])
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
checkDuplicateNom(control: AbstractControl): { [key: string]: boolean } | null {
  const nomValue = control.value;
  const isDuplicate = this.fournisseurs.some(item => item.nom === nomValue);
  return isDuplicate ? { 'duplicate': true } : null;
}
closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
  }, 2300); 
}
}

