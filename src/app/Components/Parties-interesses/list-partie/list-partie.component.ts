import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Partie } from 'src/app/models/partie';
import { TypePartie } from 'src/app/models/typepartie';
import { PartieService } from 'src/app/Services/Service-partie/partie.service';
import { TypepartieService } from 'src/app/Services/Service-TypePartie/typepartie.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';


declare var window: any;

@Component({
  selector: 'app-list-partie',
  templateUrl: './list-partie.component.html',
  styleUrls: ['./list-partie.component.css']
})
export class ListPartieComponent implements OnInit {
  processuss: any[] = [];
  typeparties: any[] = [];
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any;
  @ViewChild('typepartieModal', { static: true }) typepartieModal:any;
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.parties.length / this.itemsPerPage);
  }

  get displayedParties(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.parties.slice(startIndex, endIndex);
  }
  id : any 
  typepartie : any 
  typepartie_name : any 
  partieinteresse : any 
  importance : any 
  nature : any 
  enjeux : any 
  besoin : any 
  impactfinal : any 
  impactentreprise : any 
  cotation : any 
  impact : any 
  processus: number[] = [];
  searchQuery: string = '';
  parties : Partie[] = []
  deleteModal: any;
  idTodelete: number = 0;
  searchOptions: string[] = ['Clients', 'Fournisseurs', 'Organismes', 'Prestataires', 'Collaborateurs', 'Etat', 'Prospects'];
  filteredOptions: string[] = [];
  filteredOptionsVisible: boolean = false;

  form = new FormGroup({
    typepartie: new FormControl(''),
    partieinteresse: new FormControl(''),
    importance: new FormControl('' ),
    nature: new FormControl(''),
    enjeux: new FormControl(''),
    besoin: new FormControl(''),
    impactfinal: new FormControl(''),
    impactentreprise: new FormControl(''),
    cotation: new FormControl(''),
    impact: new FormControl(''),
    processus: new FormControl(''),


  });
  selectedTypePartie: TypePartie | undefined;
  constructor(private   partieservice : PartieService,private apiProcessusService :ProcessusService, private router : Router,private typepartieservice :TypepartieService, private bsModalService: BsModalService){
    this.filteredOptions = this.searchOptions.slice();


  }
  ngOnInit(): void {
    this.typepartieservice.getAll().subscribe(
      (data: any[]) => {
        this.typeparties = data;
        console.log(this.typeparties);
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.apiProcessusService.getProcessus().subscribe(
      (data: any[]) => {
        this.processuss = data;
        console.log(this.processuss);
      },
      (error: any) => {
        console.log(error); 
      }
    );  
    this.getParties();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];
  }
  getParties() {
    this.partieservice.getAll().subscribe(
      res => {
        this.parties = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  navigateToPartie() {
    this.router.navigate(['/add-parties']);
  }
  navigateToTypePartie() {
    this.router.navigate(['/add-typeparties']);
  }
  updatePartie() : void {
    const formData =  new FormData()
    formData.append("typepartie", this.typepartie);
    formData.append("partieinteresse", this.partieinteresse);
    formData.append("importance", this.importance);
    formData.append("nature", this.nature);
    formData.append("enjeux", this.enjeux);
    formData.append("besoin", this.besoin);
    formData.append("impactfinal", this.impactfinal);
    formData.append("impactentreprise", this.impactentreprise);
    formData.append("cotation", this.cotation);
    formData.append("impact", this.impact);
    this.processus.forEach((processusId: number) => {
      formData.append('processus', processusId.toString());
    });
  this.partieservice.update(this.id, formData)

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
isProcessusSelected(processusId: number): boolean {
  return this.processus.includes(processusId);
}

toggleProcessus(processusId: number): void {
  const index = this.processus.indexOf(processusId);
  if (index > -1) {
    this.processus.splice(index, 1); 
  } else {
    this.processus.push(processusId); 
  }
}
getPartieData(id: number, typepartie: any, partieinteresse: any, importance: any, nature: any, enjeux: any, besoin: any, impactfinal: any, impactentreprise: any, cotation: any, impact: any, processus: any) {
  this.id = id;
  this.typepartie = typepartie;
  this.partieinteresse = partieinteresse;
  this.importance = importance;
  this.nature = nature;
  this.enjeux = enjeux;
  this.besoin = besoin;
  this.impactfinal = impactfinal;
  this.impactentreprise = impactentreprise;
  this.cotation = cotation;
  this.impact = impact;
  this.processus = processus;
}

openDeleteModal(id: number) {
  this.idTodelete = id;
  this.deleteModal.show();
}


delete() {
  this.partieservice.delete(this.idTodelete).subscribe({
    next: (data) => {
      this.parties = this.parties.filter(_ => _.id != this.idTodelete)
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
openTypePartieModal(typepartie: TypePartie) {
  this.selectedTypePartie = typepartie;
  this.modalRef = this.bsModalService.show(this.typepartieModal);
}
closeModalTypePartie(){
    this.bsModalService.hide();
}
filterOptions() {
  this.filteredOptions = this.searchOptions.filter(option =>
    option.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
  
  this.filteredOptionsVisible = true;
}

selectOption(option: string) {
  this.searchQuery = option;
  this.filteredOptions = [];
  this.filteredOptionsVisible = false;
}

resetSearchQuery() {
  this.searchQuery = '';
  this.filterOptions();
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
getDisplayedRange(): string {
  const startIndex = (this.p - 1) * this.itemsPerPage + 1;
  const endIndex = Math.min(this.p * this.itemsPerPage, this.parties.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.parties.length} entrées`;
}
getRecordCount(typepartie: any): number {
  const typepartiePlans = this.parties.filter(partie => partie.typepartie === typepartie.id);
  return typepartiePlans.length;
}
closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
    location.reload();
  }, 2300); 
}
}
