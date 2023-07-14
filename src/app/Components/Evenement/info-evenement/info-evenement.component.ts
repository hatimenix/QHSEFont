import { Component, ViewChild } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiAnalyseEvenementService } from 'src/app/Services/Service-document-unique/api-analyse-evenement.service';
import { ApiArretTravailService } from 'src/app/Services/Service-document-unique/api-arret-travail.service';
import { ApiEvenementService } from 'src/app/Services/Service-document-unique/api-evenement.service';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Actions } from 'src/app/models/actions';
import { Analyses } from 'src/app/models/analyses';
import { ArretTravail } from 'src/app/models/arret-travail';
import { Evenement } from 'src/app/models/evenement';

declare var window:any;

@Component({
  selector: 'app-info-evenement',
  templateUrl: './info-evenement.component.html',
  styleUrls: ['./info-evenement.component.css']
})
export class InfoEvenementComponent {

  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  @ViewChild('deleteModalAR', { static: true }) deleteModalAR!: any;
  @ViewChild('deleteModalAN', { static: true }) deleteModalAN!: any;
  @ViewChild('successModal', { static: true }) successModal:any;
  @ViewChild('successModalAC', { static: true }) successModalAC:any;
  @ViewChild('successModalUAR', { static: true }) successModalUAR:any;
  @ViewChild('successModalUAN', { static: true }) successModalUAN:any;
  modalRef!: BsModalRef;

  evenementForm!: FormGroup;
  actionForm!: FormGroup;
  analyseForm!: FormGroup;
  arretForm!: FormGroup;
  sites$ !: Observable<any>;
  services$ !: Observable<any>;
  processus$ !: Observable<any>;
  analyses$!: Observable<Analyses[]>;
  actions$!: Observable<Actions[]>;
  evenementId !: number;
  siteName !: string;
  serviceName !: string;
  evenement !: Evenement;
  deletModal : any;
  idToDelete: number = 0;
  analyse !: Analyses;
  idAnalyse !: number;
  deleteModalAction : any;
  idToDeleteAction : number = 0;
  idToDeleteArret : number = 0;
  deletModalArret : any;
  arretTarvail$ !: Observable<ArretTravail[]>;
  arretTravailExiste = false;
  arret !: ArretTravail;
  idArret !: number;


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiEvenementService: ApiEvenementService,
    private route: ActivatedRoute,
    private apiAnalyseEvenementService: ApiAnalyseEvenementService,
    private apiActionsService: ApiActionsService,
    private apiSiteService: ApiSiteService,
    private apiServiceService: ApiServiceService,
    private apiProcessusService: ApiProcessusService,
    private apiArretTravailService : ApiArretTravailService,
    public modalService: BsModalService,
    private bsModalService: BsModalService){}

  ngOnInit(): void {

    this.analyseForm = this.formBuilder.group({
      cause: ['', Validators.required],
      probabilite: ['', Validators.required],
      frequences: ['', Validators.required],
      severite: ['', Validators.required],
      niveau_risque: ['', Validators.required],
      arbe_cause: ['', Validators.required]
    });

    this.arretForm = this.formBuilder.group({
      CMI_volet_recup : [''],
      date_debut_arret : ['', Validators.required],
      date_fin_arret : ['', Validators.required],
      duree_arret : [''],
      prolongation : [''],
      duree_total_pro : [0],
      rechute : [''],
      duree_total_rechute : [0],
      duree_total_arret : ['', Validators.required],
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
      siege_de_lesions_1: ['', Validators.required],
      siege_de_lesions_2: ['', Validators.required],
      nature_lesions: ['', Validators.required],
      site: ['', Validators.required],
      service: ['', Validators.required]
    });

    this.evenementId = +this.activatedRoute.snapshot.params['id'];
    this.apiEvenementService.getEvenement(this.evenementId).subscribe(
      (data: Evenement) => {
        this.evenement = data;
        this.evenementForm.patchValue({
          type_contract: this.evenement.type_contract,
          nom_personne: this.evenement.nom_personne,
          type_evenement: this.evenement.type_evenement,
          intitule: this.evenement.intitule,
          resume: this.evenement.resume,
          temoins: this.evenement.temoins,
          premiere_pers_info: this.evenement.premiere_pers_info,
          action_immediate: this.evenement.action_immediate,
          date_accident: this.evenement.date_accident,
          periode_travail: this.evenement.periode_travail,
          lieu_accident: this.evenement.lieu_accident,
          tache_effectue: this.evenement.tache_effectue,
          utiliser_chien: this.evenement.utiliser_chien,
          siege_de_lesions_1: this.evenement.siege_de_lesions_1,
          siege_de_lesions_2: this.evenement.siege_de_lesions_2,
          nature_lesions: this.evenement.nature_lesions,
          site: this.evenement.site,
          service: this.evenement.service,
        });
      },
      error => console.log(error)
    );

    this.sites$ = this.apiSiteService.getAllSite();
    this.services$ = this.apiServiceService.getAllService();

    this.sites$.subscribe((sites) => {
      const site = sites.find((s:any) => s.id === this.evenement.site);
      if (site) {
        this.siteName = site.site_nom;
      }
    });
    this.services$.subscribe((services) => {
      const service = services.find((s:any) => s.id === this.evenement.service);
      if (service) {
        this.serviceName = service.service_nom;
      }
    });

    this.processus$ = this.apiProcessusService.getAllProcessus();
    this.getAnalyseByEvenementId(this.evenementId);
    this.getActionsByEvenementId(this.evenementId);
    this.getArretTravailByEvenementId(this.evenementId);

    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAnalyse')
    );

    this.deletModalArret = new window.bootstrap.Modal(
      document.getElementById('deleteArret')
    );

    this.deleteModalAction = new window.bootstrap.Modal(
      document.getElementById('deleteAction')
    );
  }

  getAnalyseByEvenementId(evenementId: number) {
    this.analyses$ = this.apiAnalyseEvenementService.getAllAnalyseEvenement().pipe(
      map((analyses: Analyses[]) => analyses.filter(analyse => analyse.evenement === evenementId))
    );
  }

  getActionsByEvenementId(evenementId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(actions => actions.evenement.includes(evenementId)))
    );
  }

  getArretTravailByEvenementId(evenementId:number) {
    this.arretTarvail$ = this.apiArretTravailService.getAllArretTravail().pipe(
      map((arretTravails: ArretTravail[]) => {
        const filteredArretTravails = arretTravails.filter(arretTravail => arretTravail.evenement === evenementId);
        this.arretTravailExiste = filteredArretTravails.length > 0;
        return filteredArretTravails;
      })
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.analyseForm.get('arbe_cause')?.setValue(file);
  }

  openUpdateModalArret(arret : ArretTravail): void {
    this.arret = arret;
    this.idArret = this.arret.id;
    this.arretForm.patchValue({
      CMI_volet_recup: this.arret.CMI_volet_recup,
      date_debut_arret: this.arret.date_debut_arret,
      date_fin_arret: this.arret.date_fin_arret,
      duree_arret: this.arret.duree_arret,
      prolongation: this.arret.prolongation,
      duree_total_pro: this.arret.duree_total_pro,
      rechute: this.arret.rechute,
      duree_total_rechute: this.arret.duree_total_rechute,
      duree_total_arret: this.arret.duree_total_arret,
    });
    const modal = new window.bootstrap.Modal(document.getElementById('updateArret'));
    modal.show();
  }

  updateArret():void{
    if(this.arretForm.valid) {
      const formData = new FormData();
      formData.append('CMI_volet_recup', this.arretForm.get('CMI_volet_recup')!.value);
      formData.append('date_debut_arret', this.arretForm.get('date_debut_arret')!.value);
      formData.append('date_fin_arret', this.arretForm.get('date_fin_arret')!.value);
      formData.append('duree_arret', this.arretForm.get('duree_arret')!.value);
      formData.append('prolongation', this.arretForm.get('prolongation')!.value);
      formData.append('duree_total_pro', this.arretForm.get('duree_total_pro')!.value);
      formData.append('rechute', this.arretForm.get('rechute')!.value);
      formData.append('duree_total_rechute', this.arretForm.get('duree_total_rechute')!.value);
      formData.append('duree_total_arret', this.arretForm.get('duree_total_arret')!.value);
      formData.append('evenement', String(this.evenementId));

      this.apiArretTravailService.updateArretFormdata(this.idArret,formData).subscribe(
        () => {
          this.openModalUAR();
          console.log('Arret a été modifié avec succès.');
          this.getArretTravailByEvenementId(this.evenementId);
        },
        error => console.log(error)
      );
    }
  }

  onSubmit(): void{
    if(this.analyseForm.valid) {
      const formData = new FormData();
      formData.append('cause', this.analyseForm.get('cause')!.value);
      formData.append('probabilite', this.analyseForm.get('probabilite')!.value);
      formData.append('frequences', this.analyseForm.get('frequences')!.value);
      formData.append('severite', this.analyseForm.get('severite')!.value);
      formData.append('niveau_risque', this.analyseForm.get('niveau_risque')!.value);
      formData.append('arbe_cause', this.analyseForm.get('arbe_cause')?.value ?? '');
      formData.append('evenement', String(this.evenementId));

      this.apiAnalyseEvenementService.addAnalyseFormData(formData).subscribe(
        () => {
          this.openModal();
          console.log('Analyse a été ajouté avec succès.');
          this.getAnalyseByEvenementId(this.evenementId);
          this.analyseForm.reset();
        },
        error => console.log(error)
      );
    }
  }

  updateAnalyse(): void {
    if(this.analyseForm.valid) {
      const formData = new FormData();
      formData.append('cause', this.analyseForm.get('cause')!.value);
      formData.append('probabilite', this.analyseForm.get('probabilite')!.value);
      formData.append('frequences', this.analyseForm.get('frequences')!.value);
      formData.append('severite', this.analyseForm.get('severite')!.value);
      formData.append('niveau_risque', this.analyseForm.get('niveau_risque')!.value);
      formData.append('arbe_cause', this.analyseForm.get('arbe_cause')?.value ?? '');
      formData.append('evenement', String(this.evenementId));

      this.apiAnalyseEvenementService.updateAnalyseFormdata(this.idAnalyse,formData).subscribe(
          () => {
            this.openModalUAN();
            console.log('Analyse a été modifiée avec succès.');
            this.getAnalyseByEvenementId(this.evenementId);
          },
          error => console.log(error)
        );
      }
    }

  onFileSelectedAnalyse(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file: File = (fileInput.files as FileList)[0];
    this.analyseForm.get('arbe_cause')?.setValue(file);
  }

  openUpdateModal(analyse: Analyses): void {
    this.analyse = analyse;
    this.idAnalyse = this.analyse.id;
    this.analyseForm.patchValue({
      cause: this.analyse.cause,
      probabilite: this.analyse.probabilite,
      frequences: this.analyse.frequences,
      severite: this.analyse.severite,
      niveau_risque: this.analyse.niveau_risque,
      arbe_cause: this.analyse.arbe_cause
    });
    const modal = new window.bootstrap.Modal(document.getElementById('updateAnalyse'));
    modal.show();
  }

  onFileSelectedAction(event: any) {
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
      formData.append('evenement', String(this.evenementId));

      this.apiActionsService.addActionFormData(formData).subscribe(
        (response) => {
          this.openModalAC();
          console.log('Action a été ajouté avec succès.');
          const newActionId = response.id;      
          this.actionForm.reset();
          this.getActionsByEvenementId(this.evenementId);
        },
        error => console.log(error)
      );
    }
  }

  openDeleteModalAction(id: number) {
    this.idToDeleteAction = id;
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
  }

  openDeleteModalArret(id: number){
    this.idToDeleteArret = id;
  }

  //delete modal 
  deleteAction(): void {
    this.apiActionsService.delAction(this.idToDeleteAction)
      .subscribe(() => {
        this.getActionsByEvenementId(this.evenementId);
        this.modalRef.hide();
      });
    }

  deleteArret(): void {
    this.apiArretTravailService.delArret(this.idToDeleteArret)
      .subscribe(() => {
        this.getArretTravailByEvenementId(this.evenementId);
        this.modalRef.hide();
    });
  }  

  deleteAnalyse(): void {
    this.apiAnalyseEvenementService.delAnalyse(this.idToDelete)
      .subscribe(() => {
        this.getAnalyseByEvenementId(this.evenementId);
        this.modalRef.hide();
    });
  }  

  declineDelete(): void {
    this.modalRef.hide();
  }

  //modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
  }

  openModalAC() {
    this.modalRef = this.bsModalService.show(this.successModalAC);
  }

  openModalUAR() {
    this.modalRef = this.bsModalService.show(this.successModalUAR);
  }

  openModalUAN() {
    this.modalRef = this.bsModalService.show(this.successModalUAN);
  }
}
