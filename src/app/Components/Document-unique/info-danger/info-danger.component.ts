import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';
import { ApiEvaluationService } from 'src/app/Services/Service-document-unique/api-evaluation.service';
import { ApiEvenementService } from 'src/app/Services/Service-document-unique/api-evenement.service';
import { ApiFamilleService } from 'src/app/Services/Service-document-unique/api-famille.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Actions } from 'src/app/models/actions';
import { Dangers } from 'src/app/models/dangers';
import { Evaluations } from 'src/app/models/evaluations';
import { Evenement } from 'src/app/models/evenement';

@Component({
  selector: 'app-info-danger',
  templateUrl: './info-danger.component.html',
  styleUrls: ['./info-danger.component.css']
})
export class InfoDangerComponent {

  dangerForm!: FormGroup;
  danger!: Dangers;
  sites$ !: Observable<any>;
  services$ !: Observable<any>;
  familles$ !: Observable<any>;
  evaluations$!: Observable<Evaluations[]>;
  evenements$!: Observable<Evenement[]>;
  actions$!: Observable<Actions[]>;
  dangerId !: number;
  siteName !: string;
  serviceName !: string;
  familleName !: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiDangerService: ApiDangerService,
    private apiSiteService: ApiSiteService,
    private apiServiceService: ApiServiceService,
    private apiFamilleService: ApiFamilleService,
    private apiEvaluationService: ApiEvaluationService,
    private apiEvenementService: ApiEvenementService,
    private apiActionsService: ApiActionsService
  ) { }

  ngOnInit(): void {

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

    this.sites$.subscribe((sites) => {
      const site = sites.find((s:any) => s.id === this.danger.site);
      if (site) {
        this.siteName = site.site_nom;
      }
    });
    this.services$.subscribe((services) => {
      const service = services.find((s:any) => s.id === this.danger.service);
      if (service) {
        this.serviceName = service.service_nom;
      }
    });
    this.familles$.subscribe((familles) => {
      const famille = familles.find((f:any) => f.id === this.danger.famille);
      if (famille) {
        this.familleName = famille.famille_nom;
      }
    });

    this.getEvaluationsByDangerId(this.dangerId);
    this.getEvenementsByDangerId(this.dangerId);
    this.getActionsByDangerId(this.dangerId);

  }

  getEvaluationsByDangerId(dangerId: number) {
    this.evaluations$ = this.apiEvaluationService.getAllEvaluation().pipe(
      map((evaluations: Evaluations[]) => evaluations.filter(evaluation => evaluation.danger === dangerId))
    );
  }

  getEvenementsByDangerId(dangerId: number) {
    this.evenements$ = this.apiEvenementService.getAllEvenement().pipe(
      map((evenements: Evenement[]) => evenements.filter(evenement => evenement.dangers.includes(dangerId)))
    );
  }

  getActionsByDangerId(dangerId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(actions => actions.danger.includes(dangerId)))
    );
  }
}
