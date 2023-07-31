import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';

@Component({
  selector: 'app-add-secteur',
  templateUrl: './add-secteur.component.html',
  styleUrls: ['./add-secteur.component.css']
})
export class AddSecteurComponent {
  secteurs: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor( private router : Router,private secteurservice :SecteurService, private bsModalService: BsModalService){

  }
  mode = 'list';
  secteurf = {
    id: 1,
    secteur_nom: '',

  };
  submitted = false;
  form = new FormGroup({
    secteur_nom: new FormControl('', [Validators.minLength(3),Validators.maxLength(40),this.checkDuplicateSecteurNom.bind(this)]),

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
    this.secteurservice.getAll().subscribe(
      (data: any[]) => {
        this.secteurs = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
  }
  createSecteur() {
    const formData =  new FormData()
    formData.append("secteur_nom", this.secteurf.secteur_nom);
    this.secteurservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/listSecteur"])
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
checkDuplicateSecteurNom(control: AbstractControl): { [key: string]: boolean } | null {
  const secteur_nomValue = control.value;
  const isDuplicate = this.secteurs.some(item => item.secteur_nom === secteur_nomValue);
  return isDuplicate ? { 'duplicate': true } : null;
}

closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
  }, 2300); 
}


}
