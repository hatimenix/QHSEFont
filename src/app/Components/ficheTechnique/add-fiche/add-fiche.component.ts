import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FicheserService } from 'src/app/Services/Service-fiche-restauration/ficheser.service';



@Component({
  selector: 'app-add-fiche',
  templateUrl: './add-fiche.component.html',
  styleUrls: ['./add-fiche.component.css']
})
export class AddFicheComponent {
  ficheForm: FormGroup;



  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;

  constructor(private formBuilder: FormBuilder, private ficheService: FicheserService, private router: Router,
    private bsModalService: BsModalService
    ) {
    this.ficheForm = this.formBuilder.group({
      nom_fiche: ['', Validators.required],
      type_plat: ['', Validators.required],
      fichier: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.ficheForm.get('fichier')?.setValue(file);
  }


onSubmit() {
  if (this.ficheForm.valid) {
    const formData = new FormData();
    formData.append('nom_fiche', this.ficheForm.get('nom_fiche')?.value);
    formData.append('type_plat', this.ficheForm.get('type_plat')?.value);
    formData.append('fichier', this.ficheForm.get('fichier')?.value);

    this.ficheService.addFicheFormData(formData).subscribe(
      (response) => {
        console.log('fiche ajoutée', response);
        this.openModal();
        this.router.navigate(['/listF']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
   //modal functions 
   openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}
  
}
