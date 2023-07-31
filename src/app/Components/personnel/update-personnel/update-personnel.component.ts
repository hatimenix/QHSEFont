import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Personnel } from 'src/app/models/Personnel';

@Component({
  selector: 'app-update-personnel',
  templateUrl: './update-personnel.component.html',
  styleUrls: ['./update-personnel.component.css']
})
export class UpdatePersonnelComponent implements OnInit {
  PersonnelForm!: FormGroup;
  personnel!: Personnel;
  id!: number;
  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  emailExistsError: boolean = false;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private personnelService: PersonnelService, private bsModalService: BsModalService) { 
    this.PersonnelForm = this.formBuilder.group({
      id: [''],

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.personnelService.getPersonnelById(this.id).subscribe(
        (data: Personnel) => {
          this.personnel = data;
          this.PersonnelForm.patchValue({
            id: this.personnel.id,
            compte: this.personnel.compte,
            nom: this.personnel.nom,
            email: this.personnel.email,
            numero_tel: this.personnel.numero_tel,
            presente_vous: this.personnel.presente_vous,
            image: this.personnel.image,
            fonction: this.personnel.fonction,
            adresse_sip: this.personnel.adresse_sip,
            othermail: this.personnel.othermail
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("ID de personnel introuvable dans l'URL");
    }
  }

  onSubmit() {
    console.log(this.PersonnelForm.value);
    const formData = new FormData();
    formData.append('id', this.PersonnelForm.get('id')?.value);
    formData.append('nom', this.PersonnelForm.get('nom')?.value);
    formData.append('email', this.PersonnelForm.get('email')?.value);
    formData.append('compte', this.PersonnelForm.get('compte')?.value);
    formData.append('numero_tel', this.PersonnelForm.get('numero_tel')?.value);
    formData.append('presente_vous', this.PersonnelForm.get('presente_vous')?.value);
    formData.append('fonction', this.PersonnelForm.get('fonction')?.value);
    formData.append('adresse_sip', this.PersonnelForm.get('adresse_sip')?.value);
    formData.append('othermail', this.PersonnelForm.get('othermail')?.value);

    formData.append('image', this.PersonnelForm.get('image')?.value);


  this.personnelService.updatePersonnelFormdata(formData).subscribe(
    (data: any) => {
      console.log(data);
     
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


  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.PersonnelForm.get('image')?.setValue(file);
}



}
