import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FournisseurService } from 'src/app/Services/Service-fournisseurs/fournisseur.service';
import { Fournisseur } from 'src/app/models/fournisseur';

declare var window: any;


@Component({
  selector: 'app-list-fournisseurs',
  templateUrl: './list-fournisseurs.component.html',
  styleUrls: ['./list-fournisseurs.component.css']
})
export class ListFournisseursComponent {
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  p = 1; 
  itemsPerPage: number = 5;
  id : any 
  nom : any 
  numerodesiret : any 
  type_de_prestation : any
  numero_de_recepisse_de_declaration_prefectorale : any  
  pageweb : any  
  telephone : any  
  numerodetelecopie :any
  adresse:any
  codepostal :any
  ville :any
  pays :any
  nometprenom :any
  adressedecourier :any
  fonction :any
  numerodetelephone :any
  telephonepersonnel :any
  searchQuery: string = '';
  fournisseurs : Fournisseur[] = []
  deleteModal: any;
  idTodelete: number = 0;

  form = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numerodesiret: new FormControl(''),
    type_de_prestation: new FormControl(''),
    numero_de_recepisse_de_declaration_prefectorale: new FormControl(''),
    pageweb: new FormControl(''),
    telephone: new FormControl(''),
    numerodetelecopie: new FormControl(''),
    adresse: new FormControl(''),
    codepostal: new FormControl(''),
    ville: new FormControl(''),
    pays: new FormControl(''),
    nometprenom: new FormControl(''),
    adressedecourier: new FormControl(''),
    fonction: new FormControl(''),
    numerodetelephone: new FormControl(''),
    telephonepersonnel: new FormControl(''),

  });
  constructor(private   fournisseurservice : FournisseurService, private router : Router, private bsModalService: BsModalService){

  }
  ngOnInit(): void {
    this.getFournisseurs();
  }
  getFournisseurs() {
    this.fournisseurservice.getAll().subscribe(
      res => {
        this.fournisseurs = res;
      },
      error => {
        console.log(error);
      }
    );
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
  }
  navigateToFournisseur() {
    this.router.navigate(['/add-fournisseurs']);
  }
  
  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }

  updateFournisseur() : void {
    const formData =  new FormData()
    formData.append("nom", this.nom);
    formData.append("numerodesiret", this.numerodesiret);
    formData.append("type_de_prestation", this.type_de_prestation);
    formData.append("numero_de_recepisse_de_declaration_prefectorale", this.numero_de_recepisse_de_declaration_prefectorale);
    formData.append("pageweb", this.pageweb);
    formData.append("telephone", this.telephone);
    formData.append("numerodetelecopie", this.numerodetelecopie);
    formData.append("adresse", this.adresse);
    formData.append("codepostal", this.codepostal);
    formData.append("ville", this.ville);
    formData.append("pays", this.pays);
    formData.append("nometprenom", this.nometprenom);
    formData.append("adressedecourier", this.adressedecourier);
    formData.append("fonction", this.fonction);
    formData.append("numerodetelephone", this.numerodetelephone);
    formData.append("telephonepersonnel", this.telephonepersonnel);


  this.fournisseurservice.update(this.id, formData)

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
getFournisseurData( id : number,
  nom : any,
  numerodesiret : any,
  type_de_prestation : any,
  numero_de_recepisse_de_declaration_prefectorale : any, 
  pageweb : any,
  telephone : any,  
  numerodetelecopie :any,
  adresse:any,
  codepostal :any,
  ville :any,
  pays :any,
  nometprenom :any,
  adressedecourier :any,
  fonction :any,
  numerodetelephone :any,
  telephonepersonnel :any
){
  this.id = id,
  this.nom=nom,
  this.numerodesiret = numerodesiret,
  this.type_de_prestation = type_de_prestation,
  this.numero_de_recepisse_de_declaration_prefectorale = numero_de_recepisse_de_declaration_prefectorale,
  this.pageweb = pageweb,
  this.telephone = telephone,
  this.numerodetelecopie=numerodetelecopie,

  this.adresse=adresse,
  this.codepostal=codepostal
  this.ville=ville,
  this.pays=pays,
  this.nometprenom=nometprenom,
  this.adressedecourier=adressedecourier,
  this.fonction=fonction,
  this.numerodetelephone=numerodetelephone,
  this.telephonepersonnel=telephonepersonnel



}
  
  delete() {
    this.fournisseurservice.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.fournisseurs = this.fournisseurs.filter(_ => _.id != this.idTodelete)
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
