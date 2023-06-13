import { Component, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin, of,  } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { Actions } from 'src/app/models/actions';
import { Cotation } from 'src/app/models/cotation';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { CotationService } from 'src/app/Services/Service-cotation/cotation.service';
import { ApiRealisationService } from 'src/app/Services/Service-document-unique/api-realisation.service';
import { Realisations } from 'src/app/models/realisations';



declare var window:any;

@Component({
  selector: 'app-info-analyserisque',
  templateUrl: './info-analyserisque.component.html',
  styleUrls: ['./info-analyserisque.component.css']
})
export class InfoAnalyserisqueComponent {
  updateModalVisible: boolean = true;
  addModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  @ViewChild('addModalAction', { static: true }) addModalAction:any;
  @ViewChild('addModalCotation', { static: true }) addModalCotation:any;
  @ViewChild('successModalcotation', { static: true }) successModalcotation:any; 
  modalRef!: BsModalRef;
  analyserisqueId !: number;
  analyserisqueForm!: FormGroup;
  actionForm!: FormGroup;
  cotationForm!: FormGroup;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  actions$!: Observable<Actions[]>;
  cotations$!: Observable<Cotation[]>;
  siteName !: string;
  addedActionId !: number;
  deletModal : any;
  deletModalcotation : any ;
  idToDelete: number = 0;
  showModal = false;
  analyserisque!: AnalyseRisques;
  idAction !: number;
  action !: Actions;
  idCotation !: number;
  cotation !: Cotation;
  piece_jointe:any

  constructor(
    private route: ActivatedRoute,
    private analyserisqueservice : AnalyseRisquesService,
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService,
    private actionservice: ApiActionsService,
    private cotationservice:CotationService,
    private apiRealisationService: ApiRealisationService,

  ) {}
  ngOnInit() {
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
    this.cotationForm = this.formBuilder.group({ 
      maitrise : ['', Validators.required],
      impact : ['', Validators.required],
      probabilite : ['', Validators.required],
      ipr : ['', Validators.required],
      indice : ['', Validators.required],
      date_evaluation : ['', Validators.required],

    });
    this.analyserisqueId = +this.route.snapshot.params['id'];
    this.analyserisqueservice.getAnalyseRisques(this.analyserisqueId).subscribe(
      (data: AnalyseRisques) => {
        this.analyserisque = data;
        this.analyserisqueForm.patchValue({
          description: this.analyserisque.description,
          typologie: this.analyserisque.typologie,
          axe: this.analyserisque.axe,
          famille: this.analyserisque.famille,
          indice: this.analyserisque.indice,
          niveau_risque: this.analyserisque.niveau_risque,
          date_evaluation: this.analyserisque.date_evaluation,
          opportunite: this.analyserisque.opportunite,
          origine: this.analyserisque.origine,
          Proccesus_name: this.analyserisque.Proccesus_name,
          Site_name: this.analyserisque.Site_name,
          contexte_int: this.analyserisque.contexte_int,
          contexte_ext: this.analyserisque.contexte_ext,
          consequences: this.analyserisque.consequences,
          impact: this.analyserisque.impact,
          probabilite: this.analyserisque.probabilite,
          maitrise: this.analyserisque.maitrise,
          mesure: this.analyserisque.mesure,
          type_action: this.analyserisque.type_action

        });
      },
      error => console.log(error)
    );
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
    this.sites$.subscribe((sites) => {
      const site = sites.find((s:any) => s.id === this.analyserisque.site);
      if (site) {
        this.siteName = site.site_nom;
      }
    });
    this.getActionByAnalyseRisqueId(this.analyserisqueId);
    this.getCotationByAnalyseRisqueId(this.analyserisqueId);
    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAction')
    );
    this.deletModalcotation = new window.bootstrap.Modal(
      document.getElementById('deleteCotation')
    );
  }
  getActionByAnalyseRisqueId(analyserisqueId: number) {
    this.actions$ = this.actionservice.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(action => action.analyserisque.includes(analyserisqueId))),
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
    getCotationByAnalyseRisqueId(analyserisqueId: number) {
    this.cotations$ = this.cotationservice.getAllCotation().pipe(
      map((cotations: Cotation[]) => cotations.filter(cotation => cotation.analyserisque.includes(analyserisqueId))),

    )}
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
        formData.append('analyserisque', String(this.analyserisqueId));
  
        this.actionservice.addActionFormData(formData).subscribe(
          (response) => {
            console.log('Action a été ajouté avec succès.');
            const newActionId = response.id; // ou tout autre nom de propriété qui contient l'identifiant de l'action ajoutée
            console.log('Nouvel ID d\'action : ', newActionId);
            console.log('piece jointe : ', response.piece_jointe);
            this.getActionByAnalyseRisqueId(this.analyserisqueId);
            this.actionForm.reset();
            this.openModaladdAction();
            this.addModalVisible = false;
          },
          error => console.log(error)
        );
      }
    }
    updateAction(): void {
      const formData = new FormData();
      formData.append('Site_name', '');
      formData.append('etat', '');
      formData.append('annee', new Date().toString());
      if (this.piece_jointe !== null && this.piece_jointe !== undefined) {
        formData.append("piece_jointe", this.piece_jointe);
    }          formData.append('intitule', this.actionForm.get('intitule')!.value);
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
      formData.append('analyserisque', String(this.analyserisqueId));

      this.actionservice.updateActionFormdata(this.idAction,formData).subscribe(
          () => {
            console.log('Analyse a été modifiée avec succès.');
            this.getActionByAnalyseRisqueId(this.analyserisqueId);
            this.openModal();
            this.updateModalVisible = false;
          },
          error => console.log(error)
        );
    }
    openUpdateModal(action: Actions): void {
      this.action = action;
      this.idAction = this.action.id;
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
        etat: this.action.etat,
        annee: this.action.annee
      });
      const modal = new window.bootstrap.Modal(document.getElementById('updateAction'));
      modal.show();
    }
    addCotationFormData(): void{
      if (this.cotationForm.valid) {
        const formData = new FormData();
        formData.append('maitrise', this.cotationForm.get('maitrise')!.value);
        formData.append('impact', this.cotationForm.get('impact')!.value);
        formData.append('probabilite', this.cotationForm.get('probabilite')!.value);
        formData.append('ipr', this.cotationForm.get('ipr')!.value);
        formData.append('indice', this.cotationForm.get('indice')!.value);
        formData.append('date_evaluation', this.cotationForm.get('date_evaluation')!.value);
        formData.append('analyserisque', String(this.analyserisqueId));
  
        this.cotationservice.addCotationFormData(formData).subscribe(
          (response) => {
            console.log('Cotation a été ajouté avec succès.');
            const newCotationId = response.id;
            console.log('Nouvel ID d\'cotation : ', newCotationId);
            console.log('FormData:', formData); 
            this.getCotationByAnalyseRisqueId(this.analyserisqueId);
            this.cotationForm.reset();
            this.openModaladdCotation();
            this.addModalVisible = false;
          },
          error => console.log(error)
        );
      }
    }
    updateCotation(): void {
      const formData = new FormData();
      formData.append('maitrise', this.cotationForm.get('maitrise')!.value);
      formData.append('impact', this.cotationForm.get('impact')!.value);
      formData.append('probabilite', this.cotationForm.get('probabilite')!.value);
      formData.append('ipr', this.cotationForm.get('ipr')!.value);
      formData.append('indice', this.cotationForm.get('indice')!.value);
      formData.append('date_evaluation', this.cotationForm.get('date_evaluation')!.value);
      formData.append('analyserisque', String(this.analyserisqueId));

      this.cotationservice.updateCotationFormdata(this.idCotation,formData).subscribe(
          () => {
            console.log('Cotation a été modifiée avec succès.');
            this.getCotationByAnalyseRisqueId(this.analyserisqueId);
            
            this.openModalupdate();
            this.updateModalVisible = false;
          },
          error => console.log(error)
        );
    }
    openUpdateCotationModal(cotation: Cotation): void {
      this.cotation = cotation;
      this.idCotation = this.cotation.id;
      this.cotationForm.patchValue({
        maitrise: this.cotation.maitrise,
        impact: this.cotation.impact,
        probabilite: this.cotation.probabilite,
        ipr: this.cotation.ipr,
        indice: this.cotation.indice,
        date_evaluation: this.cotation.date_evaluation

      });
      const modal = new window.bootstrap.Modal(document.getElementById('updateCotation'));
      modal.show();
    }
    openDeleteModal(id: number) {
      this.idToDelete = id;
      this.deletModal.show();

    }
    openDeleteModalCotation(id: number) {
      this.idToDelete = id;
      this.deletModalcotation.show();

    }
    deleteAction() {
      this.actionservice.delAction(this.idToDelete).subscribe(() => {
        this.getActionByAnalyseRisqueId(this.analyserisqueId);
      })
    }
      
    deleteCotation() {
      this.cotationservice.delCotation(this.idToDelete).subscribe(() => {
        this.getCotationByAnalyseRisqueId(this.analyserisqueId);
      })
    }
    openModal() {
      this.modalRef = this.bsModalService.show(this.successModal);
    }
    closeModal() {
      this.bsModalService.hide();
      location.reload();
    }
    openModaladdAction() {
      this.modalRef = this.bsModalService.show(this.addModalAction);
    }
    openModaladdCotation() {
      this.modalRef = this.bsModalService.show(this.addModalCotation);
    }
    openModalupdate() {
      this.modalRef = this.bsModalService.show(this.successModalcotation);
    }
    onFileSelectedAction(event: any) {
      const file: File = event.target.files[0];
      this.actionForm.get('piece_jointe')?.setValue(file);
    }
    updateFile(event: any) {
      const file = event.target.files[0];
      this.piece_jointe=file
    
    }
    getSelectedFileName(): string {
      const fileInput = document.getElementById('customFile') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        return fileInput.files[0].name;
      }
      return 'Choose file';
    }
    


}
