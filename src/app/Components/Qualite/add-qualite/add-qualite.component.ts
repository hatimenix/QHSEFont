import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QualiteService } from 'src/app/Services/Service-qualite/qualite.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
@Component({
  selector: 'app-add-qualite',
  templateUrl: './add-qualite.component.html',
  styleUrls: ['./add-qualite.component.css']
})
export class AddQualiteComponent implements OnInit{
  qualites: any[] = [];
  sites: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   qualiteservice : QualiteService , private router : Router, private apiSiteService :ApiSiteService,private bsModalService: BsModalService){}
  mode = 'list';
  qualitef = {
    id: 1,
    titre: '',
    site: '',
    date_analyse:'',
    reflexion:'',
    objectifs:'',
    commentaires_responsable:'',
    objectifs_annees:'',
  };

  submitted = false;
  form = new FormGroup({
    site: new FormControl(''),
    titre: new FormControl('', [Validators.minLength(3),Validators.maxLength(40),this.checkDuplicatetitre.bind(this)]),
    date_analyse: new FormControl(''),
    reflexion: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    objectifs: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    commentaires_responsable: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    objectifs_annees: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
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
    this.qualiteservice.getAll().subscribe(
      (data: any[]) => {
        this.qualites = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
  }

createQualite() {
  
  const formData =  new FormData()
  formData.append("titre", this.qualitef.titre);
  formData.append("site", this.qualitef.site);
  formData.append("date_analyse", this.qualitef.date_analyse);
  formData.append("reflexion", this.qualitef.reflexion);
  formData.append("objectifs", this.qualitef.objectifs);
  formData.append("commentaires_responsable", this.qualitef.commentaires_responsable);
  formData.append("objectifs_annees", this.qualitef.objectifs_annees);

  this.qualiteservice.create(formData).subscribe({

    next: (res) => {
      console.log(res);
      this.router.navigate(["/qualite-list"])
      this.openModal();
      this.closeSuccessModalAfterDelay();
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
checkDuplicatetitre(control: AbstractControl): { [key: string]: boolean } | null {
  const titreValue = control.value;
  const isDuplicate = this.qualites.some(item => item.titre === titreValue);
  return isDuplicate ? { 'duplicate': true } : null;
}
closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
  }, 2300); 
}
}
