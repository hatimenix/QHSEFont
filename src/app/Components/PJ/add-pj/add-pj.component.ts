import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { PjService } from 'src/app/Services/Service-pj/pj.service';
import { Pj } from 'src/app/models/pj';

@Component({
  selector: 'app-add-pj',
  templateUrl: './add-pj.component.html',
  styleUrls: ['./add-pj.component.css']
})
export class AddPjComponent {
  errorMessage: string | null = null;
  isSuccess: boolean = false;
  showModal: boolean = false;


 //modal
 @ViewChild('successModal', { static: true }) successModal:any;
 modalRef!: BsModalRef;

 pjForm!: FormGroup;
 personnel$!: Observable<any>;


 constructor(private formBuilder: FormBuilder, 
   private pjservice : PjService,
   private router: Router,
   private personnelService : PersonnelService ,
   //modal
   private bsModalService: BsModalService) {
   this.pjForm = this.formBuilder.group({
     
     nom:  ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(40),
    ]],
     url_document:['', Validators.required],
     date_modification: ['', Validators.required],
     modifie_par: ['', Validators.required]
    
     
   });
 }

 ngOnInit(): void {
   const isFirstVisit = history.state.isFirstVisit;
   if (!isFirstVisit) {
     history.replaceState({ isFirstVisit: true }, '');
     location.reload();
   }
   window.scrollTo(0, 0);

   this.personnel$= this.personnelService.getPersonnels();
 }

 onFileSelected(event: any) {
   const file: File = event.target.files[0];
   this.pjForm.get('url_document')?.setValue(file);
 }

 onSubmit() {
  if (this.pjForm.valid) {
    const formData = new FormData();
    formData.append('nom', this.pjForm.get('nom')?.value);
    formData.append('url_document', this.pjForm.get('url_document')?.value);
    formData.append('date_modification', this.pjForm.get('date_modification')?.value);
    formData.append('modifie_par', this.pjForm.get('modifie_par')?.value);

    this.pjservice.addPjFormData(formData).subscribe(
      (response) => {
        console.log('PJ ajoutée avec succès', response);
        this.showModal = true;
        this.router.navigate(['/listpj']);
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout de PJ.';
        this.showModal = false;
      }
    );
    
    
  }
}

  //modal traitement
  openModal() {
   this.modalRef = this.bsModalService.show(this.successModal);
 }
 closeModal() {
  this.bsModalService.hide();
  this.showModal = false;
  this.errorMessage = null;
}



}
