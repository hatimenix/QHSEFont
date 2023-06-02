import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TypepartieService } from 'src/app/Services/Service-TypePartie/typepartie.service';

@Component({
  selector: 'app-add-typepartie',
  templateUrl: './add-typepartie.component.html',
  styleUrls: ['./add-typepartie.component.css']
})
export class AddTypepartieComponent {
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor( private router : Router,private typepartieservice :TypepartieService, private bsModalService: BsModalService){

  }
  mode = 'list';
  typepartief = {
    id: 1,
    nom: '',

  };
  submitted = false;
  form = new FormGroup({
    nom: new FormControl(''),

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
  }
  createTypePartie() {
    const formData =  new FormData()
    formData.append("nom", this.typepartief.nom);
    this.typepartieservice.create(formData).subscribe({

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
