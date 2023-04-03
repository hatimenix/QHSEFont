import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { Nc } from 'src/app/models/nc';

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
  // processus_name:any
  // site_name:any
  searchQuery: string = '';

  currentNc : Nc = new Nc()

  ncs : Nc[] = []



  deleteModal: any;
  idTodelete: number = 0;

  constructor(private   ncservice : ServicesNonConfirmitéService, private router : Router){

  }
  ngOnInit(): void {
    this.getNcs()
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );


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
      description_detailee:this.description_detailee
      // processus_name: this.processus_name,
      // site_name: this.site_name
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
  description_detailee:any

  // processus_name:any,
  // site_name:any
  ){
    this.id = id,
    this.intitule=intitule,
    this.nature = nature,
    this.domaine = domaine,
    this.detail_cause = detail_cause,
    this.date_nc = date_nc,
    this.date_prise_en_compte=date_prise_en_compte,
    this.description_detailee=description_detailee
    // this.processus_name=processus_name
    // this.site_name=site_name


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



}
