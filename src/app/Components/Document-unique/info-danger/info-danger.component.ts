import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';
import { ApiEvaluationService } from 'src/app/Services/Service-document-unique/api-evaluation.service';
import { ApiEvenementService } from 'src/app/Services/Service-document-unique/api-evenement.service';
import { ApiFamilleService } from 'src/app/Services/Service-document-unique/api-famille.service';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiRealisationService } from 'src/app/Services/Service-document-unique/api-realisation.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Actions } from 'src/app/models/actions';
import { Dangers } from 'src/app/models/dangers';
import { Evaluations } from 'src/app/models/evaluations';
import { Evenement } from 'src/app/models/evenement';
import { Realisations } from 'src/app/models/realisations';

declare var window:any;


@Component({
  selector: 'app-info-danger',
  templateUrl: './info-danger.component.html',
  styleUrls: ['./info-danger.component.css']
})
export class InfoDangerComponent {

  dangerForm!: FormGroup;
  actionForm!: FormGroup;
  evenementForm!: FormGroup;
  evaluationForm!: FormGroup;
  danger!: Dangers;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  services$ !: Observable<any>;
  familles$ !: Observable<any>;
  evaluations$!: Observable<Evaluations[]>;
  evenements$!: Observable<Evenement[]>;
  actions$!: Observable<Actions[]>;
  realisation !: Observable<Realisations[]>;
  dangerId !: number;
  siteName !: string;
  serviceName !: string;
  familleName !: string;
  addedActionId !: number;
  deletModal : any;
  idToDelete: number = 0;
  showModal = false;
  evenements : any;
  idEvenement !: number;

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
    private apiRealisationService: ApiRealisationService,
    private apiActionsService: ApiActionsService
  ) { }

  ngOnInit(): void {

    this.evenementForm = this.formBuilder.group({
      type_contract: ['', Validators.required],
      nom_personne: ['', Validators.required],
      type_evenement: ['', Validators.required],
      intitule: ['', Validators.required],
      resume: ['', Validators.required],
      temoins: ['', Validators.required],
      premiere_pers_info: ['', Validators.required],
      action_immediate: ['', Validators.required],
      date_accident: ['', Validators.required],
      periode_travail: ['', Validators.required],
      lieu_accident: ['', Validators.required],
      tache_effectue: ['', Validators.required],
      utiliser_chien: ['', Validators.required],
      siege_de_lesions_1: [''],
      siege_de_lesions_2: [''],
      nature_lesions: ['', Validators.required],
      site: ['', Validators.required],
      service: ['', Validators.required]
    });

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
      probabilite: ['', Validators.required, Validators.min(0)],
      severite: ['', Validators.required, Validators.min(0)],
      frequences_exposition: ['', Validators.required, Validators.min(0)],
      ipr: ['', Validators.required, Validators.min(0)],
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
      piece_jointe : ['']
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

    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAction')
    );

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
/*
  getActionsByDangerId(dangerId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(actions => actions.danger.includes(dangerId)))
    );

    // récupération des états associés aux actions
    this.actions$.subscribe((actions: Actions[]) => {
      actions.forEach((action: Actions) => {
        this.apiRealisationService.getRealisations(action.id).subscribe((realisation: Realisations) => {
          action.etat = realisation.etat;
        });
      });
    });
  } */

  getActionsByDangerId(dangerId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(action => action.danger.includes(dangerId))),
      switchMap((actions: Actions[]) => {
        const actionObservables: Observable<any>[] = actions.map(action => {
          return this.apiRealisationService.getRealisationByActionId(action.id).pipe(
            catchError(error => {
              // Handle error if the request to get the realization fails
              console.log(`Unable to get realization for action ${action.id}: ${error.message}`);
              return of(null as any); // Return null as Realisations[] type
            }),
            map((realisations: Realisations[]) => {
              const latestRealisation = realisations[realisations.length - 1];
              if (latestRealisation) {
                // If a realization exists, return an object with action and realization information
                return { ...action, etat: latestRealisation.etat };
              } else {
                // Otherwise, return an object with only action information
                return { ...action, etat: action.etat };
              }
            })
          );
        });
        return forkJoin(actionObservables);
      })
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.actionForm.get('piece_jointe')?.setValue(file);
  }


  addActionFormData(): void{
    if (this.actionForm.valid) {
      const formData = new FormData();
      formData.append('Site_name', '');
      formData.append('etat', '');
      formData.append('annee', new Date().toString());
      formData.append('piece_jointe', this.actionForm.get('piece_jointe')?.value ?? '');
      formData.append('intitule', this.actionForm.get('intitule')!.value);
      formData.append('type_action', this.actionForm.get('type_action')!.value);
      formData.append('origine_action', this.actionForm.get('origine_action')!.value);
      formData.append('reference', this.actionForm.get('reference')!.value);
      formData.append('domaine', this.actionForm.get('domaine')!.value);
      formData.append('site', this.actionForm.get('site')!.value);
      formData.append('processus', this.actionForm.get('processus')!.value);
      formData.append('analyse_cause', this.actionForm.get('analyse_cause')!.value);
      formData.append('plan_action', this.actionForm.get('plan_action')!.value);
      formData.append('delai_mise_en_oeuvre', this.actionForm.get('delai_mise_en_oeuvre')!.value);
      formData.append('assigne_a', this.actionForm.get('assigne_a')!.value);
      formData.append('priorite', this.actionForm.get('priorite')!.value);
      formData.append('delai_mesure_eff', this.actionForm.get('delai_mesure_eff')!.value);
      formData.append('type_critere_eff', this.actionForm.get('type_critere_eff')!.value);
      formData.append('detail_critere_eff', this.actionForm.get('detail_critere_eff')!.value);
      formData.append('danger', String(this.dangerId));

      this.apiActionsService.addActionFormData(formData).subscribe(
        (response) => {
          console.log('Action a été ajouté avec succès.');
          const newActionId = response.id; // ou tout autre nom de propriété qui contient l'identifiant de l'action ajoutée
          console.log('Nouvel ID d\'action : ', newActionId);
          console.log('piece jointe : ', response.piece_jointe);
          this.getActionsByDangerId(this.dangerId);
          this.actionForm.reset();
        },
        error => console.log(error)
      );
    }
  }
/*
  addDangerAction() {
    if (this.actionForm.valid) {
      const newAction = {
        Site_name: '',
        etat: '',
        annee: new Date(),
        piece_joint: null,
        evenement: [],
        intitule: this.actionForm.get('intitule')!.value,
        type_action: this.actionForm.get('type_action')!.value,
        origine_action: this.actionForm.get('origine_action')!.value,
        reference: this.actionForm.get('reference')!.value,
        domaine: this.actionForm.get('domaine')!.value,
        site: this.actionForm.get('site')!.value,
        processus: this.actionForm.get('processus')!.value,
        analyse_cause: this.actionForm.get('analyse_cause')!.value,
        plan_action: this.actionForm.get('plan_action')!.value,
        delai_mise_en_oeuvre: this.actionForm.get('delai_mise_en_oeuvre')!.value,
        assigne_a: this.actionForm.get('assigne_a')!.value,
        priorite: this.actionForm.get('priorite')!.value,
        delai_mesure_eff: this.actionForm.get('delai_mesure_eff')!.value,
        type_critere_eff: this.actionForm.get('type_critere_eff')!.value,
        detail_critere_eff: this.actionForm.get('detail_critere_eff')!.value,
        danger: [this.dangerId]
      };
  
      this.apiActionsService.addAction(newAction).subscribe(
        (response) => {
          console.log('Action a été ajouté avec succès.');
          const newActionId = response.id; // ou tout autre nom de propriété qui contient l'identifiant de l'action ajoutée
          console.log('Nouvel ID d\'action : ', newActionId);
          this.getActionsByDangerId(this.dangerId);
          this.actionForm.reset();
        },
        error => console.log(error)
      );
    } 
  }
  */

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deletModal.show();
  }

  deleteAction() {
    this.apiActionsService.delAction(this.idToDelete).subscribe(() => {
      this.getActionsByDangerId(this.dangerId);
    })
  }

  AddEvenementFormData(): void {
    if (this.evenementForm.valid) {
      const formData = new FormData();
      formData.append('type_contract', this.evenementForm.get('type_contract')!.value);
      formData.append('nom_personne', this.evenementForm.get('nom_personne')!.value);
      formData.append('type_evenement', this.evenementForm.get('type_evenement')!.value);
      formData.append('intitule', this.evenementForm.get('intitule')!.value);
      formData.append('resume', this.evenementForm.get('resume')!.value);
      formData.append('temoins', this.evenementForm.get('temoins')!.value);
      formData.append('premiere_pers_info', this.evenementForm.get('premiere_pers_info')!.value);
      formData.append('action_immediate', this.evenementForm.get('action_immediate')!.value);
      formData.append('date_accident', this.evenementForm.get('date_accident')!.value);
      formData.append('periode_travail', this.evenementForm.get('periode_travail')!.value);
      formData.append('lieu_accident', this.evenementForm.get('lieu_accident')!.value);
      formData.append('tache_effectue', this.evenementForm.get('tache_effectue')!.value);
      formData.append('utiliser_chien', this.evenementForm.get('utiliser_chien')!.value);
      formData.append('siege_de_lesions_1', this.evenementForm.get('siege_de_lesions_1')!.value);
      formData.append('siege_de_lesions_2', this.evenementForm.get('siege_de_lesions_2')!.value);
      formData.append('nature_lesions', this.evenementForm.get('nature_lesions')!.value);
      formData.append('site', this.evenementForm.get('site')!.value);
      formData.append('service', this.evenementForm.get('service')!.value);
      formData.append('dangers', String(this.dangerId));

      this.apiEvenementService.addevenementFormData(formData).subscribe(
        () => {
          console.log('Levenement a été ajouté avec succès.');
          this.getEvenementsByDangerId(this.dangerId);
          this.evenementForm.reset();
        },
        error => console.log(error)
      );
    }
  }

  openUpdateModal(evenement: Evenement): void {
    this.evenements = evenement;
    this.idEvenement = this.evenements.id;
    this.evenementForm.patchValue({
      type_contract: this.evenements.type_contract,
      nom_personne: this.evenements.nom_personne,
      type_evenement: this.evenements.type_evenement,
      intitule: this.evenements.intitule,
      resume: this.evenements.resume,
      temoins: this.evenements.temoins,
      premiere_pers_info: this.evenements.premiere_pers_info,
      action_immediate: this.evenements.action_immediate,
      date_accident: this.evenements.date_accident,
      periode_travail: this.evenements.periode_travail,
      lieu_accident: this.evenements.lieu_accident,
      tache_effectue: this.evenements.tache_effectue,
      utiliser_chien: this.evenements.utiliser_chien,
      siege_de_lesions_1: this.evenements.siege_de_lesions_1,
      siege_de_lesions_2: this.evenements.siege_de_lesions_2,
      nature_lesions: this.evenements.nature_lesions,
      site: this.evenements.site,
      service: this.evenements.service
    });
    const modal = new window.bootstrap.Modal(document.getElementById('updateEvenement'));
    modal.show();
  }

  UpdateEvenementFormData(): void {
    if (this.evenementForm.valid) {
      const formData = new FormData();
      formData.append('type_contract', this.evenementForm.get('type_contract')!.value);
      formData.append('nom_personne', this.evenementForm.get('nom_personne')!.value);
      formData.append('type_evenement', this.evenementForm.get('type_evenement')!.value);
      formData.append('intitule', this.evenementForm.get('intitule')!.value);
      formData.append('resume', this.evenementForm.get('resume')!.value);
      formData.append('temoins', this.evenementForm.get('temoins')!.value);
      formData.append('premiere_pers_info', this.evenementForm.get('premiere_pers_info')!.value);
      formData.append('action_immediate', this.evenementForm.get('action_immediate')!.value);
      formData.append('date_accident', this.evenementForm.get('date_accident')!.value);
      formData.append('periode_travail', this.evenementForm.get('periode_travail')!.value);
      formData.append('lieu_accident', this.evenementForm.get('lieu_accident')!.value);
      formData.append('tache_effectue', this.evenementForm.get('tache_effectue')!.value);
      formData.append('utiliser_chien', this.evenementForm.get('utiliser_chien')!.value);
      formData.append('siege_de_lesions_1', this.evenementForm.get('siege_de_lesions_1')!.value);
      formData.append('siege_de_lesions_2', this.evenementForm.get('siege_de_lesions_2')!.value);
      formData.append('nature_lesions', this.evenementForm.get('nature_lesions')!.value);
      formData.append('site', this.evenementForm.get('site')!.value);
      formData.append('service', this.evenementForm.get('service')!.value);


      this.apiEvenementService.updateEvenementFormdata(this.idEvenement,formData).subscribe(
          () => {
            console.log('Evenement a été modifiée avec succès.');
            this.getEvenementsByDangerId(this.dangerId);
          },
          error => console.log(error)
        );
      }
    }
  
}