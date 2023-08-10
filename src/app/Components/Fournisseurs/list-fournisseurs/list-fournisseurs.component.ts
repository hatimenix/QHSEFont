import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FournisseurService } from 'src/app/Services/Service-fournisseurs/fournisseur.service';
import { Fournisseur } from 'src/app/models/fournisseur';
import { HostBinding, ElementRef } from '@angular/core';


declare var window: any;


@Component({
  selector: 'app-list-fournisseurs',
  templateUrl: './list-fournisseurs.component.html',
  styleUrls: ['./list-fournisseurs.component.css']
})
export class ListFournisseursComponent implements OnInit {
  updateModalVisible: boolean = true;
  showPopover: boolean = false;
  isAscending: boolean = true;
  isReverseSorting: boolean = false;
  fieldsVisible: { [key: string]: boolean } = {
    siret: true,
    prestation: true,
    postal:true,
    web:true,
    adresse:true,
  };
  autoCloseDropdown: boolean = true;
    isCollapsed = true;
  isOpen = false;
  @ViewChild('successModal', { static: true }) successModal:any; 

  modalRef!: BsModalRef;
  textSize: number = 16;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.filteredFournisseurs.length / this.itemsPerPage);
  }

  get displayedFournisseurs(): Fournisseur[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFournisseurs.slice(startIndex, endIndex);
  }
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
  filterField: string = '';
  fieldSearchQuery: string = '';
  filteredFournisseurs: Fournisseur[] = [];
  fournisseurs : Fournisseur[] = []
  selectedFournisseurs: Fournisseur[] = [];
  deleteModal: any;
  selectedFournisseurToDelete: number = 0;

  form = new FormGroup({
    nom: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
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
  constructor(private el: ElementRef,private   fournisseurservice : FournisseurService, private router : Router, private bsModalService: BsModalService,){

  }
  ngOnInit(): void {
    this.loadSettingsFromLocalStorage();
    this.getFournisseurs();
    document.addEventListener('click', this.onDocumentClick.bind(this));
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 

  }
  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }
  sortByReverseAlphabet() {
    if (this.isReverseSorting) {
    this.fournisseurs.sort((a, b) => (a.nom ?? '').localeCompare(b.nom ?? ''));
    this.isAscending = false;
    this.isReverseSorting = false;
    }else {
      this.fournisseurs.sort((a, b) => (b.nom ?? '').localeCompare(a.nom ?? ''));
      this.isReverseSorting = true;
    }
  }  
  getFournisseurs() {
    this.fournisseurservice.getAll().subscribe(
      res => {
        this.fournisseurs = res;
        this.filteredFournisseurs = res; 

      },
      error => {
        console.log(error);
      }
    );
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
  }
 
  openDeleteModal(id: number) {
    this.selectedFournisseurToDelete = id;
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
          this.closeSuccessModalAfterDelay();
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
toggleWindow(): void {
  this.isOpen = !this.isOpen;
}
get f() {
  return this.form.controls;
}

delete(ids: number[]) {
  ids.forEach(id => {
    this.fournisseurservice.delete(id).subscribe({
      next: (data) => {
        this.fournisseurs = this.fournisseurs.filter(fournisseur => fournisseur.id !== id);
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
  if (this.selectedFournisseurs.length > 0) {
    const idsToDelete = this.selectedFournisseurs.map(f => f.id);
    this.delete(idsToDelete);
  } else if (this.selectedFournisseurToDelete) {
    const idToDelete = this.selectedFournisseurToDelete;
    this.delete([idToDelete]);
  }
}

  toggleSelection(fournisseur: Fournisseur) {
    const index = this.selectedFournisseurs.indexOf(fournisseur);
    if (index > -1) {
      this.selectedFournisseurs.splice(index, 1); 
    } else {
      this.selectedFournisseurs.push(fournisseur);
    }
  }
  
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }
  @HostBinding('style.fontSize.px')
  get fontSize(): number {
    return this.textSize;
  }

  increaseTextSize(): void {
    this.textSize += 2;
  }

  decreaseTextSize(event: MouseEvent): boolean {
    event.preventDefault();
    if (this.textSize > 2) {
      this.textSize -= 2;
    }
    return false;
  }
  getVisibleColumnsCount(): number {
    let count = 0;
    const fields = [
      'siret',
      'prestation',
      'postal',
      'web',
      'adresse',
    ];
  
    for (const field of fields) {
      if (this.fieldsVisible[field]) {
        count++;
      }
    }
  
    return count;
  }
  onDropdownClick(event: MouseEvent) {
    event.stopPropagation();
  }
  
  toggleDropdown() {
    this.autoCloseDropdown = !this.autoCloseDropdown;
  }
  
  onDocumentClick() {
    this.autoCloseDropdown = true;
  }
  closeWindow() {
    this.isOpen = false;
  }
  resetTextSize(): void {
    this.textSize = 16; 
  }
  filterByField(fieldName: string): void {
    this.filterField = fieldName;
    this.togglePopover();
    this.searchQuery = '';
  }
  applyFieldFilter(): void {
    const searchValue = this.fieldSearchQuery?.toLowerCase();
  
    this.filteredFournisseurs = this.fournisseurs.filter((fournisseur) => {
      const fieldValue = fournisseur[this.filterField]?.toLowerCase();
  
      if (fieldValue && searchValue) {
        return fieldValue.includes(searchValue);
      }
  
      return true;
    });
  }
  
  resetTable(): void {
    if (this.fieldSearchQuery && this.filteredFournisseurs.length === 0) {
      this.fieldSearchQuery = ''; 
      this.filterField = '';
      this.filteredFournisseurs = this.fournisseurs;
    }
  }
   
  togglePopover() {
    this.showPopover = !this.showPopover;
  }
  closePopover(): void {
    this.showPopover = false;
  }
  handleReset(): void {
    if (this.filteredFournisseurs.length === 0) {
      this.resetTable();
      this.closePopover();
    } else {
      this.closePopover();
    }
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
  resetSearchQuery() {
    this.searchQuery = '';
  }
  getDisplayedRange(): string {
    const startIndex = (this.p - 1) * this.itemsPerPage + 1;
    const endIndex = Math.min(this.p * this.itemsPerPage, this.filteredFournisseurs.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.filteredFournisseurs.length} entrées`;
  }
  closeSuccessModalAfterDelay(): void {
    setTimeout(() => {
      this.modalRef.hide();
      location.reload();
    }, 2300); 
  }
  saveSettingsToLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(this.fieldsVisible));
  }

  loadSettingsFromLocalStorage() {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      this.fieldsVisible = JSON.parse(savedSettings);
    }
  }
  
}
