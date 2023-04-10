import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';
import { ApiFamilleService } from 'src/app/Services/Service-document-unique/api-famille.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Dangers } from 'src/app/models/dangers';

@Component({
  selector: 'app-update-danger',
  templateUrl: './update-danger.component.html',
  styleUrls: ['./update-danger.component.css']
})
export class UpdateDangerComponent {

  dangerForm!: FormGroup;
  danger!: Dangers;
  sites$ !: Observable<any>;
  services$ !: Observable<any>;
  familles$ !: Observable<any>;
  dangerId !: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiDangerService: ApiDangerService,
    private apiSiteService: ApiSiteService,
    private apiServiceService: ApiServiceService,
    private apiFamilleService: ApiFamilleService
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

    this.dangerId = +this.activatedRoute.snapshot.params['id'];
    this.apiDangerService.getDanger(this.dangerId).subscribe(
      (data: Dangers) => {
        this.danger = data;
        this.dangerForm.patchValue({
          poste_de_travail: this.danger.poste_de_travail,
          taches: this.danger.taches,
          description: this.danger.description,
          consequences: this.danger.consequences,
          site: this.danger.site,
          service: this.danger.service,
          famille: this.danger.famille
        });
      },
      error => console.log(error)
    );

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

    this.apiDangerService.updateDanger(this.danger.id, danger).subscribe(
      () => {
        console.log('Le danger a été modifié avec succès.');
        this.router.navigate(['/danger']);
      },
      error => console.log(error)
    );
  }

}
