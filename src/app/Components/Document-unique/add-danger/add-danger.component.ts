import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';
import { ApiFamilleService } from 'src/app/Services/Service-document-unique/api-famille.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Dangers } from 'src/app/models/dangers';

@Component({
  selector: 'app-add-danger',
  templateUrl: './add-danger.component.html',
  styleUrls: ['./add-danger.component.css']
})
export class AddDangerComponent {

  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;

  dangerForm!: FormGroup;
  sites$ !: Observable<any>;
  services$ !: Observable<any>;
  familles$ !: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiDangerService: ApiDangerService,
    private apiSiteService: ApiSiteService,
    private apiServiceService: ApiServiceService,
    private apiFamilleService: ApiFamilleService,
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {

    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }

    // aller en haut de la page
    window.scrollTo(0, 0);


    this.dangerForm = this.formBuilder.group({
      poste_de_travail: ['', Validators.required],
      taches: ['', Validators.required],
      description: ['', Validators.required],
      consequences: ['', Validators.required],
      site: ['', Validators.required],
      service: ['', Validators.required],
      famille: ['', Validators.required]
    });

    this.sites$ = this.apiSiteService.getAllSite();
    this.services$ = this.apiServiceService.getAllService();
    this.familles$ = this.apiFamilleService.getAllFamille();
  }

  onSubmit(): void {
    const formData = this.dangerForm.value;
    const danger: Dangers = new Dangers(
      formData.poste_de_travail,
      formData.taches,
      formData.description,
      formData.consequences,
      formData.site,
      formData.service,
      formData.famille
    );

    this.apiDangerService.addDanger(danger).subscribe(
      () => {
        console.log('Le danger a été ajouté avec succès.');
        this.openModal();
        this.router.navigate(['/danger']);
      },
      error => console.log(error)
    );
  }

  //modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
  }

}
