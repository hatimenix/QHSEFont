import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { Nc } from 'src/app/models/nc';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

declare var window: any;

@Component({
  selector: 'app-list-nc',
  templateUrl: './list-nc.component.html',
  styleUrls: ['./list-nc.component.css']
})
export class ListNcComponent {
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

  searchQuery: string = '';

  currentNc : Nc = new Nc()
  originalNcs: Nc[] = [];

  ncs : Nc[] = []



  deleteModal: any;
  idTodelete: number = 0;

  constructor(private   ncservice : ServicesNonConfirmitéService, private router : Router){

  }
  ngOnInit(): void {
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
      piece_jointe:this.piece_jointe,
      processus_name: this.processus_name,
      site_name: this.site_name,
      responsable_name:this.responsable_name
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
  piece_jointe:any,

  processus_name:any,
  site_name:any,
  responsable_name:any
  ){
    this.id = id,
    this.intitule=intitule,
    this.nature = nature,
    this.domaine = domaine,
    this.detail_cause = detail_cause,
    this.date_nc = date_nc,
    this.date_prise_en_compte=date_prise_en_compte,
    this.description_detailee=description_detailee,
    this.annee=annee,
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
    this.piece_jointe=piece_jointe,
    this.processus_name=processus_name,
    this.site_name=site_name
    this.responsable_name=responsable_name


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
      this.deleteModal.hide();
    },
    error:(err) => {
      console.log(err);
    }


    
  });
}

exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(this.ncs.map((nc) => ({
    'ID': nc.id,
    'Intitule': nc.intitule,
    'Nature': nc.nature,
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
    'Site_name':nc.site_name,
    'Processus_name':nc.processus_name,
    'Responsable_name':nc.responsable_name
  })));
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const filename = 'paiperleck_non-conformités.xlsx';
  saveAs(blob, filename);
}

}
