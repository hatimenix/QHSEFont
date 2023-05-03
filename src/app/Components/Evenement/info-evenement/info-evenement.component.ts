import { Component } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiAnalyseEvenementService } from 'src/app/Services/Service-document-unique/api-analyse-evenement.service';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';
import { ApiEvenementService } from 'src/app/Services/Service-document-unique/api-evenement.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Actions } from 'src/app/models/actions';
import { Analyses } from 'src/app/models/analyses';
import { Evenement } from 'src/app/models/evenement';

declare var window:any;

@Component({
  selector: 'app-info-evenement',
  templateUrl: './info-evenement.component.html',
  styleUrls: ['./info-evenement.component.css']
})
export class InfoEvenementComponent {

  evenementForm!: FormGroup;
  analyseForm!: FormGroup;
  sites$ !: Observable<any>;
  services$ !: Observable<any>;
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


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiEvenementService: ApiEvenementService,
    private route: ActivatedRoute,
    private apiAnalyseEvenementService: ApiAnalyseEvenementService,
    private apiActionsService: ApiActionsService,
    private apiSiteService: ApiSiteService,
    private apiServiceService: ApiServiceService
  ){}

  ngOnInit(): void {

    this.analyseForm = this.formBuilder.group({
      cause: ['', Validators.required],
      probabilite: ['', Validators.required],
      frequences: ['', Validators.required],
      severite: ['', Validators.required],
      niveau_risque: ['', Validators.required],
      arbe_cause: ['', Validators.required]
    })

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

    this.getAnalyseByEvenementId(this.evenementId);
    this.getActionsByEvenementId(this.evenementId);

    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAnalyse')
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

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deletModal.show();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.analyseForm.get('arbe_cause')?.setValue(file);
  }

  deleteAnalyse(){
    this.apiAnalyseEvenementService.delAnalyse(this.idToDelete).subscribe(() => {
      this.getAnalyseByEvenementId(this.evenementId);
      this.deletModal.hide();
    })
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

}
