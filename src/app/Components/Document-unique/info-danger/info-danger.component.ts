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
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Actions } from 'src/app/models/actions';
import { Dangers } from 'src/app/models/dangers';
import { Evaluations } from 'src/app/models/evaluations';
import { Evenement } from 'src/app/models/evenement';
import { Processus } from 'src/app/models/processus';

@Component({
  selector: 'app-info-danger',
  templateUrl: './info-danger.component.html',
  styleUrls: ['./info-danger.component.css']
})
export class InfoDangerComponent {

  dangerForm!: FormGroup;
  actionForm!: FormGroup;
  evaluationForm!: FormGroup;
  danger!: Dangers;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  services$ !: Observable<any>;
  familles$ !: Observable<any>;
  evaluations$!: Observable<Evaluations[]>;
  evenements$!: Observable<Evenement[]>;
  actions$!: Observable<Actions[]>;
  dangerId !: number;
  siteName !: string;
  serviceName !: string;
  familleName !: string;
  addedActionId !: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
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
      Site_name: ['', Validators.required],
      service_name: ['', Validators.required],
      famille_name: ['', Validators.required]
    });

    this.evaluationForm = this.formBuilder.group({
      probabilite: ['', Validators.required],
      severite: ['', Validators.required],
      frequences_exposition: ['', Validators.required],
      ipr: ['', Validators.required],
      indice_risque: ['', Validators.required],
      mesure_prevention: ['', Validators.required]
    });

    this.actionForm = this.formBuilder.group({ 
      intitule : ['', Validators.required],
      type_action : ['', Validators.required],
      origine_action : ['', Validators.required],
      reference : ['', Validators.required],
      domaine : ['', Validators.required],
      site : ['', Validators.required],
      processus : ['', Validators.required],
      analyse_cause : ['', Validators.required],
      plan_action : ['', Validators.required],
      delai_mise_en_oeuvre : ['', Validators.required],
      assigne_a : ['', Validators.required],
      priorite : ['', Validators.required],
      delai_mesure_eff : ['', Validators.required],
      type_critere_eff : ['', Validators.required],
      detail_critere_eff : ['', Validators.required],
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
          Site_name: this.danger.Site_name,
          service_name: this.danger.service_name,
          famille_name: this.danger.famille_name
        });
      },
      error => console.log(error)
    );

    this.sites$ = this.apiSiteService.getAllSite();
    this.services$ = this.apiServiceService.getAllService();
    this.familles$ = this.apiFamilleService.getAllFamille();
    this.processus$ = this.apiProcessusService.getAllProcessus();

    this.sites$.subscribe((sites) => {
      const site = sites.find((s:any) => s.id === this.danger.site);
      if (site) {
        this.siteName = site.site_nom;
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

  onSubmit(): void {
    const formData = this.evaluationForm.value;
    const evaluation: Evaluations = new Evaluations(
      formData.probabilite,
      formData.severite,
      formData.frequences_exposition,
      formData.ipr,
      formData.indice_risque,
      formData.mesure_prevention,
    );

    evaluation.danger = this.dangerId;

    this.apiEvaluationService.addEvaluation(evaluation).subscribe(
      () => {
        console.log('Evaluation a été ajouté avec succès.');
        this.getEvaluationsByDangerId(this.dangerId);
        this.evaluationForm.reset();
      },
      error => console.log(error)
    );
  }

  addDangerAction(): void {
    const formData = this.actionForm.value;
    const action: Actions = new Actions (
      formData.intitule,
      formData.type_action,
      formData.origine_action,
      formData.reference,
      formData.domaine,
      formData.site,
      formData.processus,
      formData.analyse_cause,
      formData.plan_action,
      formData.delai_mise_en_oeuvre,
      formData.assigne_a,
      formData.priorite,
      formData.delai_mesure_eff,
      formData.type_critere_eff,
      formData.detail_critere_eff,
      []
    );

    action.danger = [];
    action.danger.push(this.dangerId);

    this.apiActionsService.addAction(action).subscribe(
      (addAction: Actions) => {
        console.log('Action a été ajouté avec succès.');
        this.getActionsByDangerId(this.dangerId);
        this.actionForm.reset();
        console.log(this.addedActionId);
      },
      error => console.log(error)
    );
  }

  deleteAction(id : any) {
    this.apiActionsService.delAction(id).subscribe(() => {
      this.getActionsByDangerId(this.dangerId);
    })
  }
}
