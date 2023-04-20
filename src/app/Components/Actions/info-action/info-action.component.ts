import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';
import { ApiMesuresService } from 'src/app/Services/Service-document-unique/api-mesures.service';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiRealisationService } from 'src/app/Services/Service-document-unique/api-realisation.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Actions } from 'src/app/models/actions';
import { Mesures } from 'src/app/models/mesures';
import { Processus } from 'src/app/models/processus';
import { Realisations } from 'src/app/models/realisations';

declare var window:any;

@Component({
  selector: 'app-info-action',
  templateUrl: './info-action.component.html',
  styleUrls: ['./info-action.component.css']
})
export class InfoActionComponent {

  actionForm!: FormGroup;
  actionId!: number;
  action!: Actions;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  realisation$ !: Observable<Realisations[]>;
  mesure$ !: Observable<Mesures[]>
  siteName !: string;
  procesName !: string;
  mesureForm!: FormGroup;
  deletModal : any;
  idToDelete: number = 0;
  mesure !: Mesures;

  constructor(
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private apiDangerService: ApiDangerService,
    private apiSiteService: ApiSiteService,
    private apiRealisationService: ApiRealisationService,
    private activatedRoute: ActivatedRoute,
    private apiMesuresService: ApiMesuresService,
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
      piece_joint : [''],
    });

    this.mesureForm = this.formBuilder.group({
      date_cloture: ['', Validators.required],
      resultat_mesure_eff: ['', Validators.required],
      mesure_eff: ['', Validators.required],
      cout: ['', Validators.required, Validators.min(0)]
    });

    this.actionId = +this.activatedRoute.snapshot.params['id'];
    this.apiActionsService.getActions(this.actionId).subscribe(
      (date : Actions) => {
        this.action = date;
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
          piece_joint: this.action.piece_jointe
        });
      },
      error => console.log(error)
    );

    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();

    this.sites$.subscribe((sites) => {
      const site = sites.find((s:any) => s.id === this.action.site);
      if (site) {
        this.siteName = site.site_nom;
      }
    });

    this.processus$.subscribe((Processus) => {
      const proces = Processus.find((p:any) => p.id === this.action.processus);
      if(proces) {
        this.procesName = proces.intitule;
      } 
    });

    this.getRealisationByAction(this.actionId);
    this.getMesureByAction(this.actionId);

    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteMesure')
    );

  }

  getRealisationByAction(actionId: number){
    this.realisation$ = this.apiRealisationService.getAllRealisations().pipe(
      map((realisations: Realisations[]) => realisations.filter(realisations => realisations.action_associe === actionId))
    );
  }

  getMesureByAction(actionId: number){
    this.mesure$ = this.apiMesuresService.getAllMesures().pipe(
      map((mesures: Mesures[]) => mesures.filter(mesures => mesures.action_associee === actionId))
    );
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
        console.log('Evaluation a été ajouté avec succès.');
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

}