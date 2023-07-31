import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CertificatService } from 'src/app/Services/Service-Certificat/certificat.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';

@Component({
  selector: 'app-add-certificat',
  templateUrl: './add-certificat.component.html',
  styleUrls: ['./add-certificat.component.css']
})
export class AddCertificatComponent {
  errorMessage: string | null = null;
  isSuccess: boolean = false;
  showModal: boolean = false;


 //modal
 @ViewChild('successModal', { static: true }) successModal:any;
 modalRef!: BsModalRef;

 cerificatForm!: FormGroup;
 personnel$!: Observable<any>;


 constructor(private formBuilder: FormBuilder, 
   private certificatservice : CertificatService,
   private router: Router,
   private personnelService : PersonnelService ,
   //modal
   private bsModalService: BsModalService) {
   this.cerificatForm = this.formBuilder.group({
     
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
   this.cerificatForm.get('url_document')?.setValue(file);
 }

 onSubmit() {
  if (this.cerificatForm.valid) {
    const formData = new FormData();
    formData.append('nom', this.cerificatForm.get('nom')?.value);
    formData.append('url_document', this.cerificatForm.get('url_document')?.value);
    formData.append('date_modification', this.cerificatForm.get('date_modification')?.value);
    formData.append('modifie_par', this.cerificatForm.get('modifie_par')?.value);

    this.certificatservice.addCertificatFormData(formData).subscribe(
      (response) => {
        console.log('certificat ajoutée avec succès', response);
        this.showModal = true;
        this.router.navigate(['/listcertificat']);
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
