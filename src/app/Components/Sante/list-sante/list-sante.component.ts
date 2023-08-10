import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Sante } from 'src/app/models/sante';
import { SanteService } from 'src/app/Services/Service-sante/sante.service';
import { Site } from 'src/app/models/Site';

declare var window: any;
@Component({
  selector: 'app-list-sante',
  templateUrl: './list-sante.component.html',
  styleUrls: ['./list-sante.component.css']
})
export class ListSanteComponent {
  sites: any[] = [];
  selectedSite: Site | undefined;
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any;
  @ViewChild('siteModal', { static: true }) siteModal:any;

  
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.santes.length / this.itemsPerPage);
  }

  get displayedSantes(): Sante[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.santes.slice(startIndex, endIndex);
  }
  id : any 
  site : any 
  site_name : any
  demande_de_conseils:any
  demande_de_supervision:any
  demande_de_reunion:any
  demande_de_coaching:any
  demande_de_groupe:any
  comentaires:any
  demande_entretien:any
  searchQuery: string = '';
  santes : Sante[] = []
  deleteModal: any;
  idTodelete: number = 0;
  form = new FormGroup({
    site: new FormControl(''),
    demande_de_conseils: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    demande_de_supervision: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    demande_de_reunion: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    demande_de_coaching: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    demande_de_groupe: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    comentaires: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    demande_entretien: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),


  });
  constructor(private   santeservice : SanteService, private router : Router,private apiSiteService :ApiSiteService, private bsModalService: BsModalService){

  }
  ngOnInit(): void {
    this.apiSiteService.getAllSite().subscribe(
      (data: any[]) => {
        this.sites = data;
        console.log(this.sites); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
    this.getSantes();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 
  }
  getSantes() {
    this.santeservice.getAll().subscribe(
      res => {
        this.santes = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  navigateToSante() {
    this.router.navigate(['/add-sante']);
  }
  updateSante() : void {
    const formData =  new FormData()
    formData.append("site", this.site);
    formData.append("demande_de_conseils", this.demande_de_conseils);
    formData.append("demande_de_supervision", this.demande_de_supervision);
    formData.append("demande_de_reunion", this.demande_de_reunion);
    formData.append("demande_de_coaching", this.demande_de_coaching);
    formData.append("demande_de_groupe", this.demande_de_groupe);
    formData.append("comentaires", this.comentaires);
    formData.append("demande_entretien", this.demande_entretien);

  this.santeservice.update(this.id, formData)

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
get f() {
  return this.form.controls;
}
getSanteData( id : number,
  site : any,
  demande_de_conseils : any  ,
  demande_de_supervision : any , 
  demande_de_reunion :any,
  demande_de_coaching:any,
  demande_de_groupe:any,
  comentaires:any,
  demande_entretien:any,
){
  this.id = id,
  this.site=site,
  this.demande_de_conseils = demande_de_conseils,
  this.demande_de_supervision=demande_de_supervision,
  this.demande_de_reunion=demande_de_reunion,
  this.demande_de_coaching=demande_de_coaching
  this.demande_de_groupe=demande_de_groupe,
  this.comentaires=comentaires,
  this.demande_entretien=demande_entretien

}
openDeleteModal(id: number) {
  this.idTodelete = id;
  this.deleteModal.show();
}


delete() {
  this.santeservice.delete(this.idTodelete).subscribe({
    next: (data) => {
      this.santes = this.santes.filter(_ => _.id != this.idTodelete)
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
openSiteModal(site: Site) {
  this.selectedSite = site;
  this.modalRef = this.bsModalService.show(this.siteModal);
}
closeModalsite(){
    this.bsModalService.hide();
}
resetSearchQuery() {
  this.searchQuery = '';
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.santes.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.santes.length} entrées`;
}
getRecordCount(site: any): number {
  const matchingSantes = this.santes.filter(sante => sante.site === site.id);
  const matchingExpandedSantes = matchingSantes.filter(sante =>
    this.searchQuery === '' || (
      (sante.demande_de_conseils && sante.demande_de_conseils.includes(this.searchQuery)) ||
      (sante.demande_de_supervision && sante.demande_de_supervision.includes(this.searchQuery)) ||
      (sante.demande_de_reunion && sante.demande_de_reunion.includes(this.searchQuery)) ||
      (sante.demande_de_coaching && sante.demande_de_coaching.includes(this.searchQuery)) ||
      (sante.demande_de_groupe && sante.demande_de_groupe.includes(this.searchQuery)) ||
      (sante.comentaires && sante.comentaires.includes(this.searchQuery)) ||
      (sante.demande_entretien && sante.demande_entretien.includes(this.searchQuery))
    )
  );
  return matchingExpandedSantes.length;
}

closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
    location.reload();
  }, 2300); 
}
searchAndExpand(query: string) {
  this.searchQuery = query; 
  this.sites.forEach(site => {
    site.expanded = false; 
  });

  const matchingSantes = this.santes.filter(sante =>
    (sante.demande_de_conseils && sante.demande_de_conseils.includes(query)) ||
    (sante.demande_de_supervision && sante.demande_de_supervision.includes(query)) ||
    (sante.demande_de_reunion && sante.demande_de_reunion.includes(query)) ||
    (sante.demande_de_coaching && sante.demande_de_coaching.includes(query)) ||
    (sante.demande_de_groupe && sante.demande_de_groupe.includes(query)) ||
    (sante.comentaires && sante.comentaires.includes(query)) ||
    (sante.demande_entretien && sante.demande_entretien.includes(query))
  );

  matchingSantes.forEach(matchingSante => {
    const matchingSite = this.sites.find(site => site.id === matchingSante.site);
    if (matchingSite) {
      matchingSite.expanded = true;
    }
  });
}

}
