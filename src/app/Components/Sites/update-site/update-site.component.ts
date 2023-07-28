import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-update-site',
  templateUrl: './update-site.component.html',
  styleUrls: ['./update-site.component.css']
})
export class UpdateSiteComponent implements OnInit{
  siteForm!: FormGroup;
  personnel$ !: Observable<any>;
  processus: any;
  activatedRoute: ActivatedRoute ;
  id!: number;
  site: any;
     //set time for modal
  private modalCloseTime: number = 2000; 
   //modal
   @ViewChild('successModal', { static: true }) successModal:any;
   modalRef!: BsModalRef;
   errorMessage: string | undefined;


  constructor(private fb: FormBuilder, private siteService: ApiSiteService,
    private router: Router,
    private personnelService: PersonnelService,
    private route: ActivatedRoute,
    private bsModalService: BsModalService) {
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
    this.activatedRoute = route; // assign the activated route service
     
 }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);

  
    this.personnel$ = this.personnelService.getPersonnels();

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.siteService.getSite(this.id).subscribe(
        (data: Site) => {
          this.site = data;
          this.siteForm.patchValue({
            id: this.site.id,
            site_nom: this.site.site_nom,
            sigle: this.site.sigle,
            responsable_site: this.site.responsable_site,
            groupe_retso: this.site.groupe_retso, 
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("ID de processus introuvable dans l'URL");
    }
    }
  onSubmit():void {
    const formData = this.siteForm.value;
    const site: Site= new Site (
      formData.site_nom,
      formData.sigle,
      formData.responsable_site,
      formData.groupe_retso,
    );
    this.siteService.updateSite(this.site.id, site).subscribe(
      () => {      
        console.log("Le site a été modifié avec succès");
        console.log(site);
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
   //modal functions 
   openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);

    // Set a timer to close the modal after the specified time
    setTimeout(() => {
      this.closeModal();
    }, this.modalCloseTime);
  }
  closeModal() {
    this.bsModalService.hide();
}
}
