import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SanteService } from 'src/app/Services/Service-sante/sante.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
@Component({
  selector: 'app-add-sante',
  templateUrl: './add-sante.component.html',
  styleUrls: ['./add-sante.component.css']
})
export class AddSanteComponent {
  sites: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   santeservice : SanteService, private router : Router,private apiSiteService :ApiSiteService, private bsModalService: BsModalService){

  }
  mode = 'list';
  santef = {
    id: 1,
    site: '',
    demande_de_conseils:'',
    demande_de_supervision:'',
    demande_de_reunion:'',
    demande_de_coaching:'',
    demande_de_groupe:'',
    comentaires:'',
    demande_entretien:'',

  };
  submitted = false;
  form = new FormGroup({
    site: new FormControl(''),
    demande_de_conseils: new FormControl(''),
    demande_de_supervision: new FormControl(''),
    demande_de_reunion: new FormControl(''),
    demande_de_coaching: new FormControl(''),
    demande_de_groupe: new FormControl(''),
    comentaires: new FormControl(''),
    demande_entretien: new FormControl(''),


  });
  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }

    // aller en haut de la page
    window.scrollTo(0, 0);
    this.apiSiteService.getAllSite().subscribe(
      (data: any[]) => {
        this.sites = data;
        console.log(this.sites); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
  }
  createSante() {
    const formData =  new FormData()
    formData.append("site", this.santef.site);
    formData.append("demande_de_conseils", this.santef.demande_de_conseils);
    formData.append("demande_de_supervision", this.santef.demande_de_supervision);
    formData.append("demande_de_reunion", this.santef.demande_de_reunion);
    formData.append("demande_de_coaching", this.santef.demande_de_coaching);
    formData.append("demande_de_groupe", this.santef.demande_de_groupe);
    formData.append("comentaires", this.santef.comentaires);
    formData.append("demande_entretien", this.santef.demande_entretien);
    this.santeservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/sante-list"])
        this.openModal();
        console.log(formData);
        this.submitted = true;
      },
      error: (e)  =>{  
      console.error(e);
      this.submitted = false;
    }
  })
}
get f() {
  return this.form.controls;
}

submit() {
  console.log(this.form.value);
}
openModal() {
  this.modalRef = this.bsModalService.show(this.successModal);
}
closeModal() {
  this.bsModalService.hide();
}

}
