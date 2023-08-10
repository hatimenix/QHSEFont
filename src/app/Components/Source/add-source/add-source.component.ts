import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SourceService } from 'src/app/Services/Service-Source/source.service';
@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.css']
})
export class AddSourceComponent {
  sources: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor( private router : Router,private sourceservice :SourceService, private bsModalService: BsModalService){

  }
  mode = 'list';
  sourcef = {
    id: 1,
    nom: '',

  };
  submitted = false;
  form = new FormGroup({
    nom: new FormControl('', [Validators.minLength(3),Validators.maxLength(40),this.checkDuplicateNom.bind(this)]),

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
    this.sourceservice.getAll().subscribe(
      (data: any[]) => {
        this.sources = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
  }
  createSource() {
    const formData =  new FormData()
    formData.append("nom", this.sourcef.nom);
    this.sourceservice.create(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/source-list"])
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
checkDuplicateNom(control: AbstractControl): { [key: string]: boolean } | null {
  const nomValue = control.value;
  const isDuplicate = this.sources.some(item => item.nom === nomValue);
  return isDuplicate ? { 'duplicate': true } : null;
}

closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
  }, 2300); 
}


}
