import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
@Component({
  selector: 'app-add-nc',
  templateUrl: './add-nc.component.html',
  styleUrls: ['./add-nc.component.css']
})
export class AddNcComponent {
  constructor(private   ncservice : ServicesNonConfirmitéService , private router : Router){}

  mode = 'list';
  ncf = {
    id: 1,
    intitule: '',
    nature: '',
    domaine:'',
    detail_cause:'',
    date_nc:'',
    date_prise_en_compte:'',
    description_detailee:'',
  };




  img: any;
  submitted = false;
  form = new FormGroup({
    intitule: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nature: new FormControl('', [Validators.required, Validators.minLength(3)]),
    domaine: new FormControl('', [Validators.required, Validators.minLength(3)]),
    detail_cause: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date_nc: new FormControl(''),
    date_prise_en_compte: new FormControl(''),
    description_detailee: new FormControl(''),



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
  createNC() {
    const data = {
      intitule: this.ncf.intitule,
      nature: this.ncf.nature,
      domaine:this.ncf.domaine,
      detail_cause:this.ncf.detail_cause,
      date_nc:this.ncf.date_nc,
      date_prise_en_compte:this.ncf.date_prise_en_compte,
      description_detailee:this.ncf.description_detailee,

    };
    const formData =  new FormData()
    formData.append("Intitule", this.ncf.intitule);
    formData.append("Nature", this.ncf.nature);
    formData.append("Domaine", this.ncf.domaine);
    formData.append("Detail_cause", this.ncf.detail_cause);
    formData.append("Date_nc", this.ncf.date_nc);
    formData.append("Date_prise_en_compte", this.ncf.date_prise_en_compte);
    formData.append("Description_detailee", this.ncf.description_detailee);





    console.log(data);

    this.ncservice.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["/nc-list"])
        console.log(formData);
        this.submitted = true;
      },
      error: (e)  =>{  
      console.error(e);
      this.submitted = false;
    }
  })
}

  onCancel() {
    this.mode = 'list';
  }
  




  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }
}

