import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PartieService } from 'src/app/Services/Service-partie/partie.service';
import { TypepartieService } from 'src/app/Services/Service-TypePartie/typepartie.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';

@Component({
  selector: 'app-add-partie',
  templateUrl: './add-partie.component.html',
  styleUrls: ['./add-partie.component.css']
})
export class AddPartieComponent {
  typeparties: any[] = [];
  processuss: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   partieservice : PartieService, private router : Router,private typepartieservice :TypepartieService,private apiProcessusService :ProcessusService, private bsModalService: BsModalService){

  }
  mode = 'list';
  partief = {
    id: 1,
    typepartie: '',
    processus: [] as number[],
    partieinteresse:'',
    importance:'',
    nature:'',
    enjeux:'',
    besoin:'',
    impactfinal:'',
    impactentreprise:'',
    cotation:'',
    impact:'',

  };
  submitted = false;
  form = new FormGroup({
    typepartie: new FormControl(''),
    partieinteresse: new FormControl('', [Validators.minLength(3)]),
    importance: new FormControl('', [Validators.minLength(3)]),
    nature: new FormControl('', [Validators.minLength(3)]),
    enjeux: new FormControl('', [Validators.minLength(3)]),
    besoin: new FormControl('', [Validators.minLength(3)]),
    impactfinal: new FormControl('', [Validators.pattern(/^[0-9]\d*$/)]),
    impactentreprise: new FormControl('', [Validators.pattern(/^[0-9]\d*$/)]),
    cotation: new FormControl('', [Validators.pattern(/^[0-9]\d*$/)]),
    impact: new FormControl(''),
    processus: new FormControl(''),


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
        console.log(this.processuss); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
  }
  toggleProcessus(processusId: number): void {
    const index = this.partief.processus.indexOf(processusId);
    if (index > -1) {
      this.partief.processus.splice(index, 1); 
    } else {
      this.partief.processus.push(processusId);
    }
  }
  
  
  createPartie() {
    const formData =  new FormData()
    formData.append("typepartie", this.partief.typepartie);
    formData.append("partieinteresse", this.partief.partieinteresse);
    formData.append("importance", this.partief.importance);
    formData.append("nature", this.partief.nature);
    formData.append("enjeux", this.partief.enjeux);
    formData.append("besoin", this.partief.besoin);
    formData.append("impactfinal", this.partief.impactfinal);
    formData.append("impactentreprise", this.partief.impactentreprise);
    formData.append("cotation", this.partief.cotation);
    formData.append("impact", this.partief.impact);
    this.partief.processus.forEach((processusId: number) => {
      formData.append('processus', processusId.toString());
    });
    this.partieservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/partie-list"])
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
