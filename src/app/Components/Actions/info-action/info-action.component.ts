import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiMesuresService } from 'src/app/Services/Service-document-unique/api-mesures.service';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiRealisationService } from 'src/app/Services/Service-document-unique/api-realisation.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ApiTachesService } from 'src/app/Services/Service-document-unique/api-taches.service';
import { Actions } from 'src/app/models/actions';
import { Mesures } from 'src/app/models/mesures';
import { Realisations } from 'src/app/models/realisations';
import { Taches } from 'src/app/models/taches';

declare var window:any;

@Component({
  selector: 'app-info-action',
  templateUrl: './info-action.component.html',
  styleUrls: ['./info-action.component.css']
})
export class InfoActionComponent {

  actionForm!: FormGroup;
  realisationForm !: FormGroup;
  tacheForm !: FormGroup;
  actionId!: number;
  action!: Actions;
  taches!: Taches;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  realisation$ !: Observable<Realisations[]>;
  mesure$ !: Observable<Mesures[]>;
  tache$ !: Observable<Taches[]>;
  siteName !: string;
  procesName !: string;
  mesureForm!: FormGroup;
  deletModal : any;
  idToDelete: number = 0;
  mesure !: Mesures;
  realisationId!: number;
  tacheSelectionnee!: Taches;
  realisation: any;


  constructor(
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private apiSiteService: ApiSiteService,
    private apiRealisationService: ApiRealisationService,
    private activatedRoute: ActivatedRoute,
    private apiMesuresService: ApiMesuresService,
    private apiTachesService: ApiTachesService,
    private apiActionsService: ApiActionsService
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

    this.mesureForm = this.formBuilder.group({
      date_cloture: ['', Validators.required],
      resultat_mesure_eff: ['', Validators.required],
      mesure_eff: ['', Validators.required],
      cout: ['', Validators.required, Validators.min(0)]
    });

    this.realisationForm = this.formBuilder.group({
      action_realise : ['', Validators.required],
      date_realisation : ['', Validators.required],
      etat : ['', Validators.required]
    });

    this.tacheForm = this.formBuilder.group({
      nom_tache : ['', Validators.required],
      date_debut : ['', Validators.required],
      echeance : [''],
      description : [''],
      priorite : [''],
      assigne_a : [''],
      date_realisation : [''],
      etat : [''],
      commentaire : [''],
      source : [''],
      piece_jointe : ['']
    });

    this.actionId = +this.activatedRoute.snapshot.params['id'];
    this.apiActionsService.getActions(this.actionId).subscribe(
      (data : Actions) => {
        this.action = data;
        this.actionForm.patchValue({
          intitule: this.action.intitule,
          type_action: this.action.type_action,
          origine_action: this.action.origine_action,
          reference: this.action.reference,
          domaine: this.action.domaine,
          site: this.action.site,
          processus: this.action.processus,
          analyse_cause: this.action.analyse_cause,
          plan_action: this.action.plan_action,
          delai_mise_en_oeuvre: this.action.delai_mise_en_oeuvre,
          assigne_a: this.action.assigne_a,
          priorite: this.action.priorite,
          delai_mesure_eff: this.action.delai_mesure_eff,
          type_critere_eff: this.action.type_critere_eff,
          detail_critere_eff: this.action.detail_critere_eff,
          piece_jointe: this.action.piece_jointe
        });
      },
      error => console.log(error)
    );

    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();

    /*this.sites$.subscribe((sites) => {
      const site = sites.find((s:any) => s.id === this.action.site);
      if (site) {
        this.siteName = site.site_nom;
      }
    });*/

    /*this.processus$.subscribe((Processus) => {
      const proces = Processus.find((p:any) => p.id === this.action.processus);
      if(proces) {
        this.procesName = proces.intitule;
      } 
    });*/

    this.getRealisationAndTachesByAction(this.actionId);
    this.getMesureByAction(this.actionId);
    this.getTacheByRealaisation(this.realisationId);

    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteMesure')
    );

  }

  /*getRealisationByAction(actionId: number) {
    this.realisation$ = this.apiRealisationService.getAllRealisations().pipe(
      map((realisations: Realisations[]) => {
        const realisation = realisations.find(r => r.action_associe === actionId);
        if (realisation) {
          this.realisationId = realisation.id;
        }
        return realisations.filter(r => r.action_associe === actionId);
      })
    );
  }*/

  getRealisationAndTachesByAction(actionId: number) {
    this.realisation$ = this.apiRealisationService.getAllRealisations().pipe(
      map((realisations: Realisations[]) => {
        const realisation = realisations.find(r => r.action_associe === actionId);
        if (realisation) {
          this.realisationId = realisation.id;
          this.tache$ = this.apiTachesService.getTachesByRealisationId(realisation.id);
        }
        return realisations.filter(r => r.action_associe === actionId);
      })
    );
  }
  

  /*getRealisationByAction(actionId: number) {
    this.apiRealisationService.getAllRealisations().pipe(
      map((realisations: Realisations[]) => {
        const realisation = realisations.find(r => r.action_associe === actionId);
        if (realisation) {
          this.apiTachesService.getTachesByRealisationId(realisation.id).subscribe(taches => {
            const realisationWithTaches: RealisationWithTaches = { ...realisation, taches: taches };
            this.realisation$ = of(realisationWithTaches);
          });
        }
        return realisations.filter(r => r.action_associe === actionId);
      })
    ).subscribe();
  }
  */

  getMesureByAction(actionId: number){
    this.mesure$ = this.apiMesuresService.getAllMesures().pipe(
      map((mesures: Mesures[]) => mesures.filter(mesures => mesures.action_associee === actionId))
    );
  }

  getTacheByRealaisation(realisationId: number) {
  this.tache$ = this.apiTachesService.getTachesByRealisationId(realisationId);
}

  onSubmit(): void {
    const rawFormData = this.mesureForm.getRawValue();
    const formData = this.mesureForm.value;
    const mesure: Mesures = new Mesures(
      formData.date_cloture,
      rawFormData.resultat_mesure_eff,
      formData.mesure_eff,
      formData.cout
    );

    mesure.action_associee = this.actionId;

    this.apiMesuresService.addMesure(mesure).subscribe(
      () => {
        console.log('Mesure a été ajouté avec succès.');
        this.getMesureByAction(this.actionId);
        this.mesureForm.reset();
      },
      error => console.log(error)
    );
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deletModal.show();
  }

  deleteMesure(){
    this.apiMesuresService.delMesure(this.idToDelete).subscribe(() => {
      this.getMesureByAction(this.actionId);
      this.deletModal.hide();
    })
  }

  updateMesure(): void {
    const rawFormData = this.mesureForm.getRawValue();
    const formData = this.mesureForm.value;
    const mesure: Mesures = new Mesures(
      formData.date_cloture,
      rawFormData.resultat_mesure_eff,
      formData.mesure_eff,
      formData.cout
    );

    mesure.action_associee = this.actionId;
  
    this.apiMesuresService.updateMesure(this.mesure.id, mesure).subscribe(
      () => {
        console.log('Mesure a été modifiée avec succès.');
        this.getMesureByAction(this.actionId);
        this.mesureForm.reset();
      },
      error => console.log(error)
    );
  }

  openUpdateModal(mesure: Mesures): void {
    this.mesure = mesure;
    this.mesureForm.patchValue({
      date_cloture: this.mesure.date_cloture,
      resultat_mesure_eff: this.mesure.resultat_mesure_eff,
      mesure_eff: this.mesure.mesure_eff,
      cout: this.mesure.cout
    });
    const modal = new window.bootstrap.Modal(document.getElementById('updateMesure'));
    modal.show();
  }

  addRealisation():void {
    const formData = this.realisationForm.value;
    const realisation: Realisations = new Realisations(
      formData.action_realise,
      formData.date_realisation,
      formData.etat
    );

    realisation.action_associe = this.actionId;

    this.apiRealisationService.addRealisation(realisation).subscribe(
      (response) => {
        console.log('Realisation a été ajouté avec succès.');
        this.realisationId = response.id;
        this.getRealisationAndTachesByAction(this.actionId);
        this.realisationForm.reset();
      },
      error => console.log(error)
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.tacheForm.get('piece_jointe')?.setValue(file);
  }

  addTache(): void {
    if (this.tacheForm.valid) { // Vérifie que le formulaire est valide
      const formData = new FormData();
      formData.append('nom_tache', this.tacheForm.get('nom_tache')?.value ?? '');
      formData.append('date_debut', this.tacheForm.get('date_debut')?.value ?? '');
      formData.append('echeance', this.tacheForm.get('echeance')?.value ?? '');
      formData.append('description', this.tacheForm.get('description')?.value ?? '');
      formData.append('priorite', this.tacheForm.get('priorite')?.value ?? '');
      formData.append('assigne_a', this.tacheForm.get('assigne_a')?.value ?? '');
      formData.append('date_realisation', this.tacheForm.get('date_realisation')?.value ?? '');
      formData.append('etat', this.tacheForm.get('etat')?.value ?? '');
      formData.append('commentaire', this.tacheForm.get('commentaire')?.value ?? '');
      formData.append('realisation_associee', this.realisationId.toString());
      formData.append('piece_jointe', this.tacheForm.get('piece_jointe')?.value ?? '');
      formData.append('source', this.tacheForm.get('source')?.value ?? '');
  
      this.apiTachesService.addTacheFormData(formData).subscribe(
        () => {
          console.log('La tache a été ajouté avec succès.');
          this.getTacheByRealaisation(this.realisationId);
          this.tacheForm.reset();
        },
        error => console.log(error)
      );
    } else {
      console.log('Le formulaire est invalide.');
    }
  }

  ouvrirModal(tache: Taches) {
    this.tacheSelectionnee = tache;
  }



}
