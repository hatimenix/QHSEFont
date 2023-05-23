import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { QualiteService } from 'src/app/Services/Service-qualite/qualite.service';
import { Actions } from 'src/app/models/actions';
import { Qualite } from 'src/app/models/qualite';
import { ApiRealisationService } from 'src/app/Services/Service-document-unique/api-realisation.service';
import { Realisations } from 'src/app/models/realisations';

declare var window:any;

@Component({
  selector: 'app-info-qualite',
  templateUrl: './info-qualite.component.html',
  styleUrls: ['./info-qualite.component.css']
})
export class InfoQualiteComponent {
  qualiteForm!: FormGroup;
  actionForm!: FormGroup;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  actions$!: Observable<Actions[]>;
  siteName !: string;
  addedActionId !: number;
  deletModal : any;
  idToDelete: number = 0;
  showModal = false;
  qualiteId !: number;
  qualite!: Qualite;
  
  constructor(
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private activatedRoute: ActivatedRoute,
    private apiSiteService: ApiSiteService,
    private apiActionsService: ApiActionsService,
    private qualiteservice : QualiteService,
    private apiRealisationService: ApiRealisationService,
  ) { }
  ngOnInit(): void {
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
    this.qualiteId = +this.activatedRoute.snapshot.params['id'];
    this.qualiteservice.get(this.qualiteId).subscribe(
      (data: Qualite) => {
        this.qualite = data;
        this.qualiteForm.patchValue({
          titre: this.qualite.titre,
          date_analyse: this.qualite.date_analyse,
          site_name: this.qualite.site_name,
          reflexion: this.qualite.reflexion,
          objectifs: this.qualite.objectifs,
          commentaires_responsable: this.qualite.commentaires_responsable,
          objectifs_annees: this.qualite.objectifs_annees
        });
      },
      error => console.log(error)
    );
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
    this.sites$.subscribe((sites) => {
      const site = sites.find((s:any) => s.id === this.qualite.site);
      if (site) {
        this.siteName = site.site_nom;
      }
    });
    this.getActionsByQualiteId(this.qualiteId);
    
    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAction')
    );


    
  }
  getActionsByQualiteId(qualiteId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(action => action.qualite.includes(qualiteId))),
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
      formData.append('qualite', String(this.qualiteId));

      this.apiActionsService.addActionFormData(formData).subscribe(
        (response) => {
          console.log('Action a été ajouté avec succès.');
          const newActionId = response.id; // ou tout autre nom de propriété qui contient l'identifiant de l'action ajoutée
          console.log('Nouvel ID d\'action : ', newActionId);
          console.log('piece jointe : ', response.piece_jointe);
          this.getActionsByQualiteId(this.qualiteId);
          this.actionForm.reset();
        },
        error => console.log(error)
      );
    }
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deletModal.show();
  }

  deleteAction() {
    this.apiActionsService.delAction(this.idToDelete).subscribe(() => {
      this.getActionsByQualiteId(this.qualiteId);
    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.actionForm.get('piece_jointe')?.setValue(file);
  }



}
