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
  updateModalVisible: boolean = true;
  isAscending: boolean = true;
  isReverseSorting: boolean = false;
  startDate: string | undefined;
  endDate: string | undefined;
  autoCloseDropdown: boolean = true;
  fieldsVisible: { [key: string]: boolean } = {
    domaine: true,
    frequence: true,
    cout:true,
    annee:true,
    mois:true,
  };
  @ViewChild('successModal', { static: true }) successModal:any;
  
  modalRef!: BsModalRef;
  p = 1; 
  itemsPerPage: number = 5;

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

  originalNcs: Nc[] = [];
  filteredNcs: Nc[] = [];


  ncs : Nc[] = []

  deleteModal: any;
  idTodelete: number = 0;
  
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

updateFile(event: any) {
  const file = event.target.files[0];
  this.piece_jointe=file

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
  processus_name:any,
  site_name:any,

  responsable_name:any,
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
    this.processus_name=processus_name,
    this.site_name=site_name
    this.responsable_name=responsable_name,
    this.processus=processus,
    this.site=site,
    this.responsable_traitement=responsable_traitement



}
navigateToNc() {
  this.router.navigate(['/nc-add']);
}

openDeleteModal(id: number) {
  this.idTodelete = id;
  this.deleteModal.show();
}


delete() {
  this.ncservice.delete(this.idTodelete).subscribe({
    next: (data) => {
      this.ncs = this.ncs.filter(_ => _.id != this.idTodelete)
      location.reload()
      this.deleteModal.hide();
    },
    error:(err) => {
      console.log(err);
    }


    
  });
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

}
