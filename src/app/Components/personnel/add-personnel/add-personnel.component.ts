import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Personnel } from 'src/app/models/Personnel';

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.css']
})
export class AddPersonnelComponent  {
  PersonnelForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private personnelService: PersonnelService, private router: Router) {
    this.PersonnelForm = this.formBuilder.group({
      
      image: ['', Validators.required],
      compte: ['', Validators.required],
      nom: ['', Validators.required],
      courrier: ['', [Validators.required, Validators.email]],
      numero_tel: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      presente_vous: ['', Validators.required],
      fonction: ['', Validators.required],
      adresse_sip: ['', Validators.required],
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
      formData.append('courrier', this.PersonnelForm.get('courrier')?.value);
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
          this.router.navigate(['/listP']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

 
}
