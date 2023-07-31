import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExigencesService } from 'src/app/Services/Service-exigences/exigences.service';
import { PartieService } from 'src/app/Services/Service-partie/partie.service';
@Component({
  selector: 'app-add-exigences',
  templateUrl: './add-exigences.component.html',
  styleUrls: ['./add-exigences.component.css']
})
export class AddExigencesComponent {
  exigences: any[] = [];
  partieinteressess: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   exigenceservice : ExigencesService, private router : Router,private partieservice :PartieService, private bsModalService: BsModalService){

  }
  mode = 'list';
  exigencef = {
    id: 1,
    type_exigence: '',
    intitule:'',
    evaluation_maitrise:'',
    description:'',
    commentaire:'',
    action:false,
    partieinteresses:'',

  };
  submitted = false;
  form = new FormGroup({
    type_exigence: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    intitule: new FormControl('', [Validators.minLength(3),Validators.maxLength(40),this.checkDuplicateintitule.bind(this)]),
    evaluation_maitrise: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    description: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    commentaire: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    action: new FormControl(false),
    partieinteresses: new FormControl(''),

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
    this.partieservice.getAll().subscribe(
      (data: any[]) => {
        this.partieinteressess = data;
        console.log(this.partieinteressess); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
    this.exigenceservice.getAllExigences().subscribe(
      (data: any[]) => {
        this.exigences = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
  }
  createExigence() {
    const formData =  new FormData()
    formData.append("partieinteresses", this.exigencef.partieinteresses);
    formData.append("type_exigence", this.exigencef.type_exigence);
    formData.append("intitule", this.exigencef.intitule);
    formData.append("evaluation_maitrise", this.exigencef.evaluation_maitrise);
    formData.append("description", this.exigencef.description);
    formData.append("commentaire", this.exigencef.commentaire);
    formData.append("action", this.exigencef.action.toString());
    
    this.exigenceservice.addExigenceFormData(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/exigence-list"])
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
checkDuplicateintitule(control: AbstractControl): { [key: string]: boolean } | null {
  const intituleValue = control.value;
  const isDuplicate = this.exigences.some(item => item.intitule === intituleValue);
  return isDuplicate ? { 'duplicate': true } : null;
}
closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
  }, 2300); 
}

}
