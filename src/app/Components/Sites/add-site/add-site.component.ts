import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent {
  siteForm!: FormGroup;
  personnel$ !: Observable<any>;
  errorMessage: string | undefined; // Add this variable to store the error message
  //modal 
  isSiteAdded: boolean = false;


    //modal
    @ViewChild('successModal', { static: true }) successModal:any;
    modalRef!: BsModalRef;

  constructor(private fb: FormBuilder, 
    private siteService:  ApiSiteService,
     private router: Router,
     private personnelService: PersonnelService,
     private bsModalService: BsModalService
     ) {
  }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);

    this.siteForm = this.fb.group({
      site_nom: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]],
      sigle: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]],
      responsable_site: [''],
      groupe_retso:['',Validators.required],
    });
    this.personnel$ = this.personnelService.getPersonnels();
  }
  onSubmit(): void {
    const formData = this.siteForm.value;
    const site: Site = new Site(
      formData.site_nom,
      formData.sigle,
      formData.responsable_site,
      formData.groupe_retso,
    );

    this.siteService.addSite(site).subscribe(
      () => {
        console.log("Le site a été ajouté avec succès");
        console.log(site);
        // Mark the site addition as successful
        this.isSiteAdded = true;
        this.errorMessage = undefined; // Clear any previous error message
        this.openModal();
        this.router.navigate(['/listsites']);
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de l'ajout de site", error);
         // Check for 500 Internal Server Error
      if (error.status === 500 && error.error) {
        this.errorMessage = "Ce nom de site existe déjà";
        } else {
          // Handle other errors, if needed
          console.log('An error occurred:', error);
        }

        if (error.status === 400 && error.error && error.error.site_nom) {
          // Display the custom error message from the backend
          this.errorMessage = "Ce nom de site existe déjà";
        } else {
          // Handle other errors, if needed
          console.log('An error occurred:', error);
        }
      }
    );
  }
   //modal functions 
   openModal() {
    if (this.isSiteAdded) {
      this.modalRef = this.bsModalService.show(this.successModal);
    }
  }
  closeModal() {
    this.bsModalService.hide();
}
  
}
