import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceRegistreTraitementService } from 'src/app/Services/Service-registre-traitement/service-registre-traitement.service';
import { FournisseurService } from 'src/app/Services/Service-fournisseurs/fournisseur.service';
import { Traitement } from 'src/app/models/traitement';

declare var window: any;

@Component({
  selector: 'app-list-registre-traitement',
  templateUrl: './list-registre-traitement.component.html',
  styleUrls: ['./list-registre-traitement.component.css']
})
export class ListRegistreTraitementComponent implements OnInit{
  fournisseurs: any[] = [];
  traitements: any[] = [];
  updateModalVisible: boolean = true
  showTypeRegistre = false;
  showRespRegistre = false;
  startDate: string | undefined;
  endDate: string | undefined;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  originalTraitements: Traitement[] = [];
  filteredTraitements: Traitement[] = [];
  searchQuery: string = '';
  filterField: string = '';
  fieldSearchQuery: string = '';
  showPopover: boolean = false;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.filteredTraitements.length / this.itemsPerPage);
  }

  get displayedTraitements(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredTraitements.slice(startIndex, endIndex);
  }
  selectedTraitements: Traitement[] = [];
  deleteModal: any;
  selectedTraitementToDelete: number = 0;
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
    fournisseur_dpo:any
    fournisseur_representant:any

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
    constructor(private  traitementservice :ServiceRegistreTraitementService,private router: Router,private   fournisseurservice : FournisseurService,private bsModalService: BsModalService){ }

  ngOnInit(): void{
   this.refreshtraitementlist();
   this.originalTraitements = this.traitements.slice(); // create a copy of the original list

  }
  refreshtraitementlist(){
    this.traitementservice.getAll().subscribe(res=>{
      this.originalTraitements = res;
      this.filteredTraitements = res; 
      this.traitements=res   
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
    this.startDate = ''; 
    this.endDate = ''; 
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];
  }
  filterByTypeRegistre() {
    this.showTypeRegistre = !this.showTypeRegistre;
  }
  
  filterByRespRegistre() {
    this.showRespRegistre = !this.showRespRegistre;
  }
  resetFilter() {
    this.filteredTraitements = this.originalTraitements;
  }
  openDeleteModal(id: number) {
    this.selectedTraitementToDelete = id;
    this.deleteModal.show();
  }
  filterByDateCreation(): void {
    const startDate = this.startDate ? new Date(this.startDate) : null;
    const endDate = this.endDate ? new Date(this.endDate) : null;
  
    const filteredTraitements = this.traitements.filter(traitement => {
      const traitementDate = traitement.datedecreation ? new Date(traitement.datedecreation) : null;
  
      if (startDate instanceof Date && endDate instanceof Date && traitementDate instanceof Date) {
        return traitementDate >= startDate && traitementDate <= endDate;
      }
      return false;
    });
  
    this.filteredTraitements = filteredTraitements;
  }
  resetDateFilter(): void {
    this.startDate = undefined;
    this.endDate = undefined;
    this.filteredTraitements = this.originalTraitements;
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
    formData.append('fournisseur_dpo', this.fournisseur_dpo);
    formData.append('fournisseur_representant', this.fournisseur_representant);
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
    lesdonneesconcernee: any,
    fournisseur_dpo:any,
    fournisseur_representant:any
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
      this.lesdonneesconcernee=lesdonneesconcernee,
      this.fournisseur_dpo=fournisseur_dpo,
      this.fournisseur_representant=fournisseur_representant

    }
    delete(ids: number[]) {
      ids.forEach(id => {
        this.traitementservice.delete(id).subscribe({
          next: (data) => {
            this.traitements = this.traitements.filter(traitement => traitement.id !== id);
            location.reload()
            this.deleteModal.hide();
            },
          error: (err) => {
            console.log(err);
          }
        });
      });
    }
    deleteItem() {
      if (this.selectedTraitements.length > 0) {
        const idsToDelete = this.selectedTraitements.map(t => t.id);
        this.delete(idsToDelete);
      } else if (this.selectedTraitementToDelete) {
        const idToDelete = this.selectedTraitementToDelete;
        this.delete([idToDelete]);
      }
    }
    
      toggleSelection(traitement: Traitement) {
        const index = this.selectedTraitements.indexOf(traitement);
        if (index > -1) {
          this.selectedTraitements.splice(index, 1); 
        } else {
          this.selectedTraitements.push(traitement);
        }
      }
    openModal() {
      this.modalRef = this.bsModalService.show(this.successModal);
    }
    closeModal() {
      this.bsModalService.hide();
      location.reload();
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
    filterByField(fieldName: string): void {
      this.filterField = fieldName;
      this.togglePopover();
      this.searchQuery = '';
    }
    applyFieldFilter(): void {
      const searchValue = this.fieldSearchQuery?.toLowerCase();
    
      this.filteredTraitements = this.traitements.filter((traitement) => {
        const fieldValue = traitement[this.filterField]?.toLowerCase();
    
        if (fieldValue && searchValue) {
          return fieldValue.includes(searchValue);
        }
    
        return true;
      });
    }
    
    resetTable(): void {
      if (this.fieldSearchQuery && this.filteredTraitements.length === 0) {
        this.fieldSearchQuery = ''; 
        this.filterField = '';
        this.filteredTraitements = this.traitements;
      }
    }
     
    togglePopover() {
      this.showPopover = !this.showPopover;
    }
    closePopover(): void {
      this.showPopover = false;
    }
    handleReset(): void {
      if (this.filteredTraitements.length === 0) {
        this.resetTable();
        this.closePopover();
      } else {
        this.closePopover();
      }
    }  
    resetSearchQuery() {
      this.searchQuery = '';
    }
    getDisplayedRange(): string {
      const startIndex = (this.p - 1) * this.itemsPerPage + 1;
      const endIndex = Math.min(this.p * this.itemsPerPage, this.filteredTraitements.length);
      return `Affichage de ${startIndex} à ${endIndex} de ${this.filteredTraitements.length} entrées`;
    }

}
