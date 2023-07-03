import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AxesStrategiquesService } from 'src/app/Services/Service-AxesStratégiques/axes-strategiques.service';
@Component({
  selector: 'app-add-axes',
  templateUrl: './add-axes.component.html',
  styleUrls: ['./add-axes.component.css']
})
export class AddAxesComponent implements OnInit {
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   axeservice : AxesStrategiquesService , private router : Router, private bsModalService: BsModalService){}
  mode = 'list';
  axef = {
    id: 1,
    axe: '',
    sigle: '',
  };

  submitted = false;
  form = new FormGroup({
    axe: new FormControl('', [Validators.required, Validators.minLength(3)]),
    sigle: new FormControl(''),

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
  createAxe() {
    
    const formData =  new FormData()
    formData.append("axe", this.axef.axe);
    formData.append("sigle", this.axef.sigle);

    this.axeservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/axe-list"])
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
