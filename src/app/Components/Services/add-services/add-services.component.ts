import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent {
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor( private router : Router,private servicesService :ApiServiceService, private bsModalService: BsModalService){

  }
  mode = 'list';
  servicef = {
    id: 1,
    service_nom: '',

  };
  submitted = false;
  form = new FormGroup({
    service_nom: new FormControl(''),

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
  createService() {
    const formData =  new FormData()
    formData.append("service_nom", this.servicef.service_nom);
    this.servicesService.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/listServices"])
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
