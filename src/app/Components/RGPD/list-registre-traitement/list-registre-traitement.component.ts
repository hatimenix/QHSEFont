import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceRegistreTraitementService } from 'src/app/Services/Service-registre-traitement/service-registre-traitement.service';
import { FournisseurService } from 'src/app/Services/Service-fournisseurs/fournisseur.service';

declare var window: any;

@Component({
  selector: 'app-list-registre-traitement',
  templateUrl: './list-registre-traitement.component.html',
  styleUrls: ['./list-registre-traitement.component.css']
})
export class ListRegistreTraitementComponent {
  fournisseurs: any[] = [];
  traitements: any[] = [];
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  constructor(private  traitementservice :ServiceRegistreTraitementService,private router: Router,private   fournisseurservice : FournisseurService,private bsModalService: BsModalService){ }
  TraitementList:any=[];
  searchQuery: string = '';
  p = 1; 
  itemsPerPage: number = 5;
  deleteModal: any;
  idTodelete: number = 0;
    id: any
    fournisseur: any
    typeregistre:any
    nomtraitement: any
    description_generale:any
    datedecreation: any
    datedemiseajour: any
    responsable_traitement:any
    finaliteprincipale: any
    sous_finalite1: any
    sous_finalite2: any
    sous_finalite3: any
    sous_finalite4: any
    donneesensible:any
    type_donnee:any
    categorie: any
    description: any
    dureedeconcesrvation: any
    personneconcernees:any
    precisions:any
    typedestinataire:any
    precision:any
    donneeconcernees:any
    mtypedemesuredesecurite: any
    destinataire: any
    pays: any
    typedegarantie: any
    lienversladocumentation: any
    lesdonneesconcernee: any
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
      lesdonneesconcernee: new FormControl('')


    });
  ngOnInit(): void{
   this.refreshtraitementlist();
  }
  refreshtraitementlist(){
    this.traitementservice.getAll().subscribe(data=>{
      this.TraitementList=data;
    })
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
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
  }
  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }
  updatetraitement() : void {
    const formData = new FormData();
    formData.append('fournisseur', this.fournisseur);
    formData.append('typeregistre', this.typeregistre);
    formData.append('nomtraitement', this.nomtraitement);
    formData.append('datedecreation', this.datedecreation);
    formData.append('datedemiseajour', this.datedemiseajour);
    formData.append('description_generale', this.description_generale);
    formData.append('responsable_traitement', this.responsable_traitement);
    formData.append('precision', this.precision);
    formData.append('finaliteprincipale', this.finaliteprincipale);
    formData.append('sous_finalite1', this.sous_finalite1);
    formData.append('sous_finalite2', this.sous_finalite2);
    formData.append('sous_finalite3', this.sous_finalite3);
    formData.append('sous_finalite4', this.sous_finalite4);
    formData.append('donneesensible', this.donneesensible);
    formData.append('type_donnee', this.type_donnee);
    formData.append('categorie', this.categorie);
    formData.append('description', this.description);
    formData.append('dureedeconcesrvation', this.dureedeconcesrvation);
    formData.append('personneconcernees', this.personneconcernees);
    formData.append('precisions', this.precisions);
    formData.append('typedestinataire', this.typedestinataire);
    formData.append('precision', this.precision);
    formData.append('donneeconcernees', this.donneeconcernees);
    formData.append('mtypedemesuredesecurite', this.mtypedemesuredesecurite);
    formData.append('destinataire', this.destinataire);
    formData.append('pays', this.pays);
    formData.append('typedegarantie', this.typedegarantie);
    formData.append('lienversladocumentation', this.lienversladocumentation);
    formData.append('lesdonneesconcernee', this.lesdonneesconcernee);
    this.traitementservice.update(this.id, formData)

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
getTraitementData(
  id: any,
    fournisseur: any,
    typeregistre:any,
    nomtraitement: any,
    description_generale:any,
    datedecreation: any,
    datedemiseajour: any,
    responsable_traitement:any,
    finaliteprincipale: any,
    sous_finalite1: any,
    sous_finalite2: any,
    sous_finalite3: any,
    sous_finalite4: any,
    donneesensible:any,
    type_donnee:any,
    categorie: any,
    description: any,
    dureedeconcesrvation: any,
    personneconcernees:any,
    precisions:any,
    typedestinataire:any,
    precision:any,
    donneeconcernees:any,
    mtypedemesuredesecurite: any,
    destinataire: any,
    pays: any,
    typedegarantie: any,
    lienversladocumentation: any,
    lesdonneesconcernee: any
    ){
      this.id = id,
      this.fournisseur=fournisseur,
      this.typeregistre = typeregistre,
      this.nomtraitement = nomtraitement,
      this.description_generale = description_generale,
      this.datedecreation = datedecreation,
      this.datedemiseajour = datedemiseajour,
      this.responsable_traitement=responsable_traitement,
      this.finaliteprincipale=finaliteprincipale,
      this.sous_finalite1=sous_finalite1
      this.sous_finalite2=sous_finalite2,
      this.sous_finalite3=sous_finalite3,
      this.sous_finalite4=sous_finalite4,
      this.donneesensible=donneesensible,
      this.type_donnee=type_donnee,
      this.categorie=categorie,
      this.description=description,
      this.dureedeconcesrvation=dureedeconcesrvation,
      this.personneconcernees=personneconcernees,
      this.precisions=precisions,
      this.typedestinataire=typedestinataire,
      this.precision=precision,
      this.donneeconcernees=donneeconcernees,
      this.mtypedemesuredesecurite=mtypedemesuredesecurite,
      this.destinataire=destinataire,
      this.pays=pays,
      this.typedegarantie=typedegarantie,
      this.lienversladocumentation=lienversladocumentation,
      this.lesdonneesconcernee=lesdonneesconcernee
    }
    delete() {
      this.traitementservice.delete(this.idTodelete).subscribe({
        next: (data) => {
          this.traitements = this.traitements.filter(_ => _.id != this.idTodelete)
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
