import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Personnel } from 'src/app/models/Personnel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.css']
})
export class AddPersonnelComponent  {
  PersonnelForm!: FormGroup;
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  emailExistsError: boolean = false;
  isPersonnelAdded: boolean = false;



  constructor(private formBuilder: FormBuilder, private personnelService: PersonnelService, private router: Router,private bsModalService: BsModalService) {
    this.PersonnelForm = this.formBuilder.group({
      image: [''],
      compte: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
      ]],
      nom:  ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
      ]],
      email: ['', [Validators.required, Validators.email]],
      numero_tel: ['', [ Validators.pattern('^\\d{10}$')]],
      presente_vous:  ['', [
       
        Validators.maxLength(50),
      ]],
      fonction:  ['', [
        Validators.maxLength(40),
      ]],
      adresse_sip:  ['', [
        Validators.maxLength(40),
      ]],
      othermail: ['', Validators.email]
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.PersonnelForm.get('image')?.setValue(file);
  }
  onSubmit() {
    if (this.PersonnelForm.valid) {
      const formData = new FormData();
      formData.append('nom', this.PersonnelForm.get('nom')?.value);
      formData.append('email', this.PersonnelForm.get('email')?.value);
      formData.append('compte', this.PersonnelForm.get('compte')?.value);
      formData.append('numero_tel', this.PersonnelForm.get('numero_tel')?.value);
      formData.append('presente_vous', this.PersonnelForm.get('presente_vous')?.value);
      formData.append('fonction', this.PersonnelForm.get('fonction')?.value);
      formData.append('adresse_sip', this.PersonnelForm.get('adresse_sip')?.value);
      formData.append('othermail', this.PersonnelForm.get('othermail')?.value);
      formData.append('image', this.PersonnelForm.get('image')?.value);
  
      this.personnelService.addPersonnelFormData(formData).subscribe(
        (response) => {
          console.log('personnel ajoutée', response);
          this.isPersonnelAdded = true;

          this.openModal();
          this.router.navigate(['/listP']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error?.email) {
            this.emailExistsError = true;
          } else {
            console.error('An error occurred while creating user:', error);
          }
        }
      );
    }
  }
  
  openModal() {
    if (this.isPersonnelAdded) {
      this.modalRef = this.bsModalService.show(this.successModal);
    }  }
  closeModal() {
    this.bsModalService.hide();
}
isImageSelectedAndValid(): boolean {
  const imageControl = this.PersonnelForm.get('image');
  return !!imageControl && imageControl.valid && imageControl.touched;
}


 
}