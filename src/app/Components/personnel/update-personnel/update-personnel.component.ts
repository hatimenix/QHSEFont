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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private personnelService: PersonnelService, private bsModalService: BsModalService) { 
    this.PersonnelForm = this.formBuilder.group({
      id: [''],
      compte: ['', Validators.required],
      courrier: ['', Validators.required],
      image: [''],
      nom: ['', Validators.required],
      numero_tel: ['', Validators.required],
      presente_vous: ['', Validators.required],
      fonction: ['', Validators.required],
      adresse_sip: ['', Validators.required],
      othermail: ['', Validators.required]
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
            courrier: this.personnel.courrier,
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
    formData.append('courrier', this.PersonnelForm.get('courrier')?.value);
    formData.append('compte', this.PersonnelForm.get('compte')?.value);
    formData.append('numero_tel', this.PersonnelForm.get('numero_tel')?.value);
    formData.append('presente_vous', this.PersonnelForm.get('presente_vous')?.value);
    formData.append('fonction', this.PersonnelForm.get('fonction')?.value);
    formData.append('adresse_sip', this.PersonnelForm.get('adresse_sip')?.value);
    formData.append('othermail', this.PersonnelForm.get('othermail')?.value);

    const file = this.PersonnelForm.get('image')?.value;
  if (file instanceof File) {
    formData.append('image', file, file.name);
  }

  this.personnelService.updatePersonnelFormdata(formData).subscribe(
    (data: any) => {
      console.log(data);
      // Retrieve the updated image data from the response if available
      const updatedImage = data.image;
      // Update the form value with the new image value
      this.PersonnelForm.patchValue({
        image: updatedImage
      });
      this.router.navigate(['/listP']);
      this.openModal();
     
    },
    (error: any) => {
      console.log(error);
    }
  );
  }


  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}

onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  const file: File = (fileInput.files as FileList)[0];
  this.PersonnelForm.get('image')?.setValue(''); // Set to empty string to avoid DOMException error
}




}
