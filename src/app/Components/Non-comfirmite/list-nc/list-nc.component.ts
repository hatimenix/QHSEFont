import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { Nc } from 'src/app/models/nc';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Utilsateur } from 'src/app/models/utilsateur';

declare var window: any;

@Component({
  selector: 'app-list-nc',
  templateUrl: './list-nc.component.html',
  styleUrls: ['./list-nc.component.css']
})
export class ListNcComponent implements OnInit {
  sites: any[] = [];
  processuss: any[] = [];
  utilisateurs: any[] = [];
  selectedUtilisateur: Utilsateur | undefined;
  updateModalVisible: boolean = true;
  existingFileUrl: string = '';
  isAscending: boolean = true;
  isReverseSorting: boolean = false;
  startDate: string | undefined;
  endDate: string | undefined;
  autoCloseDropdown: boolean = true;
  showPopover: boolean = false;
  fieldsVisible: { [key: string]: boolean } = {
    domaine: true,
    frequence: true,
    cout:true,
    annee:true,
    mois:true,
  };
  @ViewChild('successModal', { static: true }) successModal:any;
  @ViewChild('utilisateurModal', { static: true }) utilisateurModal:any;

  
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1; 
  get totalPages(): number {
    return Math.ceil(this.filteredNcs.length / this.itemsPerPage);
  }

  get displayedNcs(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredNcs.slice(startIndex, endIndex);
  }

  id : any 
  intitule : any
  nature : any  
  domaine : any  
  detail_cause : any  
  date_nc :any
  date_prise_en_compte:any
  description_detailee:any
  annee:any
  mois:any
  delai_prevu:any
  type_cause:any
  cout:any
  progress:any
  info_complementaires:any
  frequence:any
  gravite:any
  action_immediate:any
  nc_cloture:any
  piece_jointe:any
  site_name:any
  processus_name:any
  responsable_name:any
  processus:any
  site:any
  responsable_traitement:any

  searchQuery: string = '';
  filterField: string = '';
  fieldSearchQuery: string = '';
  originalNcs: Nc[] = [];
  filteredNcs: Nc[] = [];

  ncs : Nc[] = []

  selectedNcs: Nc[] = [];
  deleteModal: any;
  selectedNcToDelete: number = 0;
  
  form = new FormGroup({
    intitule: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nature: new FormControl('', [Validators.required, Validators.minLength(3)]),
    domaine: new FormControl('', [Validators.required, Validators.minLength(3)]),
    detail_cause: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date_nc: new FormControl(''),
    date_prise_en_compte: new FormControl(''),
    description_detailee: new FormControl(''),
    annee: new FormControl(''),
    mois: new FormControl(''),
    delai_prevu: new FormControl(''),
    type_cause: new FormControl(''),
    cout: new FormControl(''),
    progress: new FormControl(''),
    info_complementaires: new FormControl(''),
    frequence: new FormControl(''),
    gravite: new FormControl(''),
    action_immediate: new FormControl(''),
    nc_cloture: new FormControl(''),
    piece_jointe: new FormControl(''),
    processus: new FormControl(''),
    site: new FormControl(''),
    responsable_traitement: new FormControl(''),

  });

  constructor(private   ncservice : ServicesNonConfirmitéService, private router : Router,private apiProcessusService :ProcessusService,private apiSiteService :ApiSiteService,private apiUtilisateurService: ApiUtilisateurService,private bsModalService: BsModalService){

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
    this.apiProcessusService.getProcessus().subscribe(
      (data: any[]) => {
        this.processuss = data;
        console.log(this.processuss); // Print the processuss to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
    this.apiUtilisateurService.getAllUtilsateur().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs); // Print the utilisateurs to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    ); 
    this.getNcs();
    this.originalNcs = this.ncs.slice(); // create a copy of the original list
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
    this.startDate = ''; 
  this.endDate = ''; 
  document.addEventListener('click', this.onDocumentClick.bind(this));
  this.itemsPerPageOptions = [5, 10, 15];
  this.itemsPerPage = this.itemsPerPageOptions[0]; 

}
ngOnDestroy() {
  document.removeEventListener('click', this.onDocumentClick.bind(this));
}
  sortByReverseAlphabet() {
    if (this.isReverseSorting) {
    this.filteredNcs.sort((a, b) => (a.intitule ?? '').localeCompare(b.intitule ?? ''));
    this.isAscending = false;
    this.isReverseSorting = false;
    }else {
      this.filteredNcs.sort((a, b) => (b.intitule ?? '').localeCompare(a.intitule ?? ''));
      this.isReverseSorting = true;
    }
  }  
  
  filterByEtatTrue() {
    this.filteredNcs = this.originalNcs.filter(nc => nc.nc_cloture === true);
  }
  
  filterByEtatFalse() {

    this.filteredNcs = this.originalNcs.filter(nc => nc.nc_cloture === false);
  }
  resetFilter() {
    this.filteredNcs = this.originalNcs;
  }
  

getNcs() {
  this.ncservice.getAll().subscribe(
    res => {
      this.originalNcs = res;
      this.filteredNcs = res;
      this.ncs=res;
    },
    error => {
      console.log(error);
    }
  );
}

updateNc() : void {

  const formData =  new FormData()
    formData.append("intitule", this.intitule);
    formData.append("nature", this.nature);
    formData.append("domaine", this.domaine);
    formData.append("detail_cause", this.detail_cause);
    formData.append("date_nc", this.date_nc);
    formData.append("description_detailee", this.description_detailee);
    if (this.delai_prevu !== null && this.delai_prevu !== undefined) {
      formData.append("delai_prevu", this.delai_prevu);
  }      if (this.date_prise_en_compte !== null && this.date_prise_en_compte !== undefined) {
      formData.append("date_prise_en_compte", this.date_prise_en_compte);
  }  
    formData.append("annee", this.annee);
    formData.append("mois", this.mois);
    formData.append("type_cause", this.type_cause);
    formData.append("cout", this.cout);
    formData.append("progress", this.progress);
    formData.append("info_complementaires", this.info_complementaires);
    if (this.piece_jointe !== null && this.piece_jointe !== undefined) {
      formData.append("piece_jointe", this.piece_jointe);
  }    
    formData.append("gravite", this.gravite);
    formData.append("action_immediate", this.action_immediate);
    formData.append("nc_cloture", this.nc_cloture);
    formData.append("processus", this.processus);
    formData.append("site", this.site);
    formData.append("responsable_traitement", this.responsable_traitement);

  this.ncservice.update(this.id, formData)

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
      get_url_file(id: number): void {
        this.ncservice.getExistingFileUrl(id).subscribe({
          next: (res) => {
            if (res) {
              console.log('Existing File URL:', res);
              this.existingFileUrl = res;
            } else {
              console.error('Invalid response: missing fileUrl');
            }
          },
          error: (e) => {
            console.error(e);
          }
        });
      }
      
      
updateFile(event: any) {
  this.piece_jointe = event.target.files[0];

}
download(piece_jointe: string): void {
  this.ncservice.downloadFile(piece_jointe);
}
filterByDateNC(): void {
  const startDate = this.startDate ? new Date(this.startDate) : null;
  const endDate = this.endDate ? new Date(this.endDate) : null;

  const filteredNcs = this.originalNcs.filter(nc => {
    const ncDate = nc.date_nc ? new Date(nc.date_nc) : null;

    if (startDate instanceof Date && endDate instanceof Date && ncDate instanceof Date) {
      return ncDate >= startDate && ncDate <= endDate;
    }
    return false;
  });

  this.filteredNcs = filteredNcs;
}



getNcData( id : number,
  intitule:any,
  nature : any,
  domaine: any,
  detail_cause:any,
  date_nc:any,
  date_prise_en_compte:any,
  description_detailee:any,
  annee:any,
  mois:any,
  delai_prevu:any,
  type_cause:any,
  cout:any,
  progress:any,
  info_complementaires:any,
  frequence:any,
  gravite:any,
  action_immediate:any,
  nc_cloture:any,
  processus:any,
  site:any,
  responsable_traitement:any,

  ){
    this.id = id,
    this.intitule=intitule,
    this.nature = nature,
    this.domaine = domaine,
    this.detail_cause = detail_cause,
    this.date_nc = date_nc,
    this.date_prise_en_compte=date_prise_en_compte,

    this.description_detailee=description_detailee,
    this.annee=annee
    this.mois=mois,
    this.delai_prevu=delai_prevu,
    this.type_cause=type_cause,
    this.cout=cout,
    this.progress=progress,
    this.info_complementaires=info_complementaires,
    this.frequence=frequence,
    this.gravite=gravite,
    this.action_immediate=action_immediate,
    this.nc_cloture=nc_cloture,
    this.processus=processus,
    this.site=site,
    this.responsable_traitement=responsable_traitement



}
navigateToNc() {
  this.router.navigate(['/nc-add']);
}

openDeleteModal(id: number) {
  this.selectedNcToDelete = id;
  this.deleteModal.show();
}
delete(ids: number[]) {
  ids.forEach(id => {
    this.ncservice.delete(id).subscribe({
      next: (data) => {
        this.ncs = this.ncs.filter(nc => nc.id !== id);
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
  if (this.selectedNcs.length > 0) {
    const idsToDelete = this.selectedNcs.map(n => n.id);
    this.delete(idsToDelete);
  } else if (this.selectedNcToDelete) {
    const idToDelete = this.selectedNcToDelete;
    this.delete([idToDelete]);
  }
}

  toggleSelection(nc: Nc) {
    const index = this.selectedNcs.indexOf(nc);
    if (index > -1) {
      this.selectedNcs.splice(index, 1); 
    } else {
      this.selectedNcs.push(nc);
    }
  }
  
exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(this.filteredNcs.map((nc) => ({
    'ID': nc.id,
    'Intitule': nc.intitule,
    'Nature': nc.nature,
    'Site':nc.site_name,
    'Processus':nc.processus_name,
    'Responsable traitement':nc.responsable_name,
    'Domaine': nc.domaine,
    'Detail_cause':nc.detail_cause,
    'Date_nc' :nc.date_nc,
    'Date_prise_en_compte':nc.date_prise_en_compte,
    'Description_detailee':nc.description_detailee,
    'Annee':nc.annee,
    'Mois':nc.mois,
    'Delai_prevu':nc.delai_prevu,
    'Type_cause':nc.type_cause,
    'Cout':nc.cout,
    'Progress':nc.progress,
    'Info_complementaires':nc.info_complementaires,
    'Frequence':nc.frequence,
    'Gravite':nc.gravite,
    'Action_immediate':nc.action_immediate,
    'Nc_cloture':nc.nc_cloture,
    'Piece_jointe':nc.piece_jointe,
  })));
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const filename = 'paiperleck_non-conformités.xlsx';
  saveAs(blob, filename);
}

openModal() {
  this.modalRef = this.bsModalService.show(this.successModal);
}
closeModal() {
  this.bsModalService.hide();
  location.reload();
}
getVisibleColumnsCount(): number {
  let count = 0;
  const fields = [
    'domaine',
    'frequence',
    'cout',
    'annee',
    'mois',
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

onDocumentClick(event: MouseEvent) {
  this.autoCloseDropdown = true;
}
getSelectedFileName(): string {
  const fileInput = document.getElementById('customFile2') as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    return fileInput.files[0].name;
  }
  return 'Choose file';
}

getFileNameFromUrl(url: string): string {
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  return decodeURIComponent(fileName); // Decode the URI component
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

  this.filteredNcs = this.ncs.filter((nc) => {
    const fieldValue = nc[this.filterField]?.toLowerCase();

    if (fieldValue && searchValue) {
      return fieldValue.includes(searchValue);
    }

    return true;
  });
}

resetTable(): void {
  if (this.fieldSearchQuery && this.filteredNcs.length === 0) {
    this.fieldSearchQuery = ''; 
    this.filterField = '';
    this.filteredNcs = this.ncs;
  }
}
 
togglePopover() {
  this.showPopover = !this.showPopover;
}
closePopover(): void {
  this.showPopover = false;
}
handleReset(): void {
  if (this.filteredNcs.length === 0) {
    this.resetTable();
    this.closePopover();
  } else {
    this.closePopover();
  }
}
resetSearchQuery() {
  this.searchQuery = '';
}
openUtilisateurModal(utilisateur: Utilsateur) {
  this.selectedUtilisateur = utilisateur;
  this.modalRef = this.bsModalService.show(this.utilisateurModal);
}
closeModalutilisateur(){
    this.bsModalService.hide();
}
getDisplayedRange(): string {
  const startIndex = (this.p - 1) * this.itemsPerPage + 1;
  const endIndex = Math.min(this.p * this.itemsPerPage, this.filteredNcs.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.filteredNcs.length} entrées`;
}
}
