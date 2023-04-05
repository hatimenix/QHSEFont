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

    annee:'',
    mois:'',
    delai_prevu:'',
    type_cause:'',
    cout:'',
    progress:'',
    etat:'',
    info_complementaires:'',
    frequence:'',
    gravite:'',
    action_immediate:'',
    nc_cloture:'',
    piece_jointe:''


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
      annee:this.ncf.annee,
      mois:this.ncf.mois,
      delai_prevu:this.ncf.delai_prevu,
      type_cause:this.ncf.type_cause,
      cout:this.ncf.cout,
      progress:this.ncf.progress,
      etat:this.ncf.etat,
      info_complementaires:this.ncf.info_complementaires,
      frequence:this.ncf.frequence,
      gravite:this.ncf.gravite,
      action_immediate:this.ncf.action_immediate,
      nc_cloture:this.ncf.nc_cloture,
      piece_jointe:this.ncf.piece_jointe


    };
    const formData =  new FormData()
    formData.append("Intitule", this.ncf.intitule);
    formData.append("Nature", this.ncf.nature);
    formData.append("Domaine", this.ncf.domaine);
    formData.append("Detail_cause", this.ncf.detail_cause);
    formData.append("Date_nc", this.ncf.date_nc);
    formData.append("Date_prise_en_compte", this.ncf.date_prise_en_compte);
    formData.append("Description_detailee", this.ncf.description_detailee);
    formData.append("mois", this.ncf.mois);
    formData.append("delai_prevu", this.ncf.delai_prevu);
    formData.append("type_cause", this.ncf.type_cause);
    formData.append("cout", this.ncf.cout);
    formData.append("progress", this.ncf.progress);
    formData.append("etat", this.ncf.etat);
    formData.append("info_complementaires", this.ncf.info_complementaires);
    formData.append("frequence", this.ncf.frequence);
    formData.append("gravite", this.ncf.gravite);
    formData.append("action_immediate", this.ncf.action_immediate);
    formData.append("nc_cloture", this.ncf.nc_cloture);
    formData.append("piece_jointe", this.ncf.piece_jointe);






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

