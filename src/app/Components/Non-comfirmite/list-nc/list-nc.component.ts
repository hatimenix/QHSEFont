import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { Nc } from 'src/app/models/nc';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ApiProcessusService } from 'src/app/Services/Services-non-confirmité/api-processus.service';

declare var window: any;

@Component({
  selector: 'app-list-nc',
  templateUrl: './list-nc.component.html',
  styleUrls: ['./list-nc.component.css']
})
export class ListNcComponent {
  sites: any[] = [];
  processuss: any[] = [];
  utilisateurs: any[] = [];
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
  etat:any
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

  currentNc : Nc = new Nc()
  originalNcs: Nc[] = [];

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
    etat: new FormControl(''),
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

  constructor(private   ncservice : ServicesNonConfirmitéService, private router : Router,private apiProcessusService :ApiProcessusService,private apiSiteService :ApiSiteService,private apiUtilisateurService: ApiUtilisateurService){

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
    this.apiProcessusService.getAllProcessus().subscribe(
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
  }
  
  filterByEtatTrue() {
    this.resetFilter()
    this.originalNcs = this.ncs.slice(); // make a copy of the original list
    this.ncs = this.ncs.filter(nc => nc.etat === true);

  }

  filterByEtatFalse() {
    this.originalNcs = this.ncs.slice(); // make a copy of the original list
    this.ncs = this.ncs.filter(nc => nc.etat === false);

    }
    resetFilter() {
      this.ncs = this.originalNcs.slice(); // assign the original list back
    }

getNcs() {
  this.ncservice.getAll().subscribe(
    res => {
      this.ncs = res;
    },
    error => {
      console.log(error);
    }
  );
}

deleteNc(id : number){
  this.ncservice.delete(id).subscribe(
    data => {
      
      console.log(data)
    },error => {
      console.log(error)
    }
  )

}
updateNc() : void {
  this.currentNc = {
      id: this.id,
      intitule: this.intitule,
      domaine: this.domaine,
      nature: this.nature,
      detail_cause: this.detail_cause,
      date_nc: this.date_nc,
      date_prise_en_compte:this.date_prise_en_compte,
      description_detailee:this.description_detailee,
      annee:this.annee,
      mois:this.mois,
      delai_prevu:this.delai_prevu,
      type_cause:this.type_cause,
      cout:this.cout,
      progress:this.progress,
      etat:this.etat,
      info_complementaires:this.info_complementaires,
      frequence:this.frequence,
      gravite:this.gravite,
      action_immediate:this.action_immediate,
      nc_cloture:this.nc_cloture,
      processus_name: this.processus_name,
      site_name: this.site_name,

      responsable_name:this.responsable_name,
      processus:this.processus,
      site:this.site,
      responsable_traitement: parseInt(this.responsable_traitement)
    };


  this.ncservice.update(this.currentNc.id, this.currentNc)
      .subscribe({
          next: (res) => {
              console.log(res);
              location.reload();
          },
          error: (e) => {
              console.error(e);
          }
      });
}
downloadPiece(id: number): void {
  this.ncservice.downloadPiece(id).subscribe(
    (response: any) => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = response.fichier.split('/').pop();
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    (error: any) => {
      console.log(error);
    }
  );
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
  etat:any,
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
    this.etat=etat,
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
updateFile(event:any) {
  const file = event.target.files[0];
  this.currentNc.piece_jointe=file
}
openDeleteModal(id: number) {
  this.idTodelete = id;
  this.deleteModal.show();
}


delete() {
  this.ncservice.delete(this.idTodelete).subscribe({
    next: (data) => {
      this.ncs = this.ncs.filter(_ => _.id != this.idTodelete)
      this.deleteModal.hide();
    },
    error:(err) => {
      console.log(err);
    }


    
  });
}
uploadFile(event: any) {
  const file = event.target.files[0];
  this.currentNc.piece_jointe=file


}

exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(this.ncs.map((nc) => ({
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
    'Etat':nc.etat,
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


}
