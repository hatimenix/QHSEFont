import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { PjService } from 'src/app/Services/Service-pj/pj.service';
import { RapportAuditService } from 'src/app/Services/Service-rapport-audit/rapport-audit.service';

@Component({
  selector: 'app-add-rapport-audit',
  templateUrl: './add-rapport-audit.component.html',
  styleUrls: ['./add-rapport-audit.component.css']
})
export class AddRapportAuditComponent {

  errorMessage: string | null = null;
  isSuccess: boolean = false;
  showModal: boolean = false;


 //modal
 @ViewChild('successModal', { static: true }) successModal:any;
 modalRef!: BsModalRef;

 rpForm!: FormGroup;
 personnel$!: Observable<any>;


 constructor(private formBuilder: FormBuilder, 
   private rpservice : RapportAuditService,
   private router: Router,
   private personnelService : PersonnelService ,
   //modal
   private bsModalService: BsModalService) {
   this.rpForm = this.formBuilder.group({
     
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
   this.rpForm.get('url_document')?.setValue(file);
 }

 onSubmit() {
  if (this.rpForm.valid) {
    const formData = new FormData();
    formData.append('nom', this.rpForm.get('nom')?.value);
    formData.append('url_document', this.rpForm.get('url_document')?.value);
    formData.append('date_modification', this.rpForm.get('date_modification')?.value);
    formData.append('modifie_par', this.rpForm.get('modifie_par')?.value);

    this.rpservice.addRapportFormData(formData).subscribe(
      (response: any) => {
        console.log('rapport ajoutée avec succès', response);
        this.showModal = true;
        this.router.navigate(['/listrapport']);
      },
      (error: any) => {
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
