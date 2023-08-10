import { Component, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
import { Exigences } from 'src/app/models/exigences';
import { Partie } from 'src/app/models/partie';
import { PartieService } from 'src/app/Services/Service-partie/partie.service';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { ExigencesService } from 'src/app/Services/Service-exigences/exigences.service';

declare var window:any;


@Component({
  selector: 'app-info-partie',
  templateUrl: './info-partie.component.html',
  styleUrls: ['./info-partie.component.css']
})
export class InfoPartieComponent {
  updateModalVisible: boolean = true;
  addModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  @ViewChild('addModalAnalyse', { static: true }) addModalAnalyse:any;
  @ViewChild('addModalExigence', { static: true }) addModalExigence:any;
  @ViewChild('successModalexigence', { static: true }) successModalexigence:any; 


  modalRef!: BsModalRef;
  partieId !: number;
  partieForm!: FormGroup;
  exigenceForm!: FormGroup;
  analyseForm!: FormGroup;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  analyserisques$!: Observable<AnalyseRisques[]>;
  exigences$!: Observable<Exigences[]>;
  siteName !: string;
  addedAnalyseId !: number;
  deletModal : any;
  deletModalexigence : any ;
  idToDelete: number = 0;
  showModal = false;
  partie!: Partie;
  idAnalyse !: number;
  analyse !: AnalyseRisques;
  idExigence !: number;
  exigence !: Exigences;
  indice : any;
  constructor(
    private route: ActivatedRoute,
    private partieservice : PartieService,
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService,
    private analyseservice: AnalyseRisquesService,
    private exigenceservice:ExigencesService
  ) {}
  ngOnInit() {
    this.analyseForm = this.formBuilder.group({ 
      site : ['', Validators.required],
      description : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      typologie : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      axe : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      famille : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      indice : ['', Validators.required],
      niveau_risque : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      date_evaluation : ['', Validators.required],
      opportunite : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      origine : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      processus : ['', Validators.required],
      contexte_int : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      contexte_ext : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      consequences : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      impact : ['', Validators.required],
      probabilite : ['', Validators.required],
      maitrise : ['', Validators.required],
      mesure : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      type_action : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],

    });
    this.exigenceForm = this.formBuilder.group({ 
      type_exigence : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      intitule : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      evaluation_maitrise : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      description : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      commentaire : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      action : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],

    });
    this.partieId = +this.route.snapshot.params['id'];
    this.partieservice.get(this.partieId).subscribe(
      (data: Partie) => {
        this.partie = data;
        this.partieForm.patchValue({
          typepartie_name: this.partie.typepartie_name,
          partieinteresse: this.partie.partieinteresse,
          importance: this.partie.importance,
          nature: this.partie.nature,
          enjeux: this.partie.enjeux,
          besoin: this.partie.besoin,
          impactfinal: this.partie.impactfinal,
          impactentreprise: this.partie.impactentreprise,
          cotation: this.partie.cotation,
          impact: this.partie.impact
        });
      },
      error => console.log(error)
    );
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
    this.getAnalyseByPartieId(this.partieId);
    this.getExigenceByPartieId(this.partieId);

    
    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAnalyse')
    );
    this.deletModalexigence = new window.bootstrap.Modal(
      document.getElementById('deleteExigence')
    );

  }
  getAnalyseByPartieId(partieId: number) {
    this.analyserisques$ = this.analyseservice.getAllAnalyseRisques().pipe(
      map((analyserisques: AnalyseRisques[]) => analyserisques.filter(analyse => analyse.partieinteresses.includes(partieId))),
    )}
 getExigenceByPartieId(partieId: number) {
    this.exigences$ = this.exigenceservice.getAllExigences().pipe(
      map((exigences: Exigences[]) => exigences.filter(exigence => exigence.partieinteresses.includes(partieId))),

    )}
    addAnalyseFormData(): void{
      if (this.analyseForm.valid) {
        const formData = new FormData();
        formData.append('Site_name', '');
        formData.append('site', this.analyseForm.get('site')!.value);
        formData.append('description', this.analyseForm.get('description')!.value);
        formData.append('typologie', this.analyseForm.get('typologie')!.value);
        formData.append('axe', this.analyseForm.get('axe')!.value);
        formData.append('famille', this.analyseForm.get('famille')!.value);
        formData.append('indice', this.analyseForm.get('indice')!.value);
        formData.append('niveau_risque', this.analyseForm.get('niveau_risque')!.value);
        formData.append('date_evaluation', this.analyseForm.get('date_evaluation')!.value);
        formData.append('opportunite', this.analyseForm.get('opportunite')!.value);
        formData.append('origine', this.analyseForm.get('origine')!.value);
        formData.append('processus', this.analyseForm.get('processus')!.value);
        formData.append('contexte_int', this.analyseForm.get('contexte_int')!.value);
        formData.append('contexte_ext', this.analyseForm.get('contexte_ext')!.value);
        formData.append('consequences', this.analyseForm.get('consequences')!.value);
        formData.append('impact', this.analyseForm.get('impact')!.value);
        formData.append('probabilite', this.analyseForm.get('probabilite')!.value);
        formData.append('maitrise', this.analyseForm.get('maitrise')!.value);
        formData.append('mesure', this.analyseForm.get('mesure')!.value);
        formData.append('type_action', this.analyseForm.get('type_action')!.value);
        formData.append('partieinteresses', String(this.partieId));
  
        this.analyseservice.addAnalyseRisque(formData).subscribe(
          (response) => {
            console.log('Analyse risque a été ajouté avec succès.');
            const newAnalyseId = response.id;
            console.log('Nouvel ID d\'analyse : ', newAnalyseId);
            console.log('FormData:', formData); 
            this.getAnalyseByPartieId(this.partieId);
            this.analyseForm.reset();
            this.openModaladdAnalyse();
            this.addModalVisible = false;
            this.closeSuccessModalAfterDelay();
          },
          error => console.log(error)
        );
      }
    }
    updateAnalyse(): void {
      const formData = new FormData();
        formData.append('Site_name', '');
        formData.append('site', this.analyseForm.get('site')!.value);
        formData.append('description', this.analyseForm.get('description')!.value);
        formData.append('typologie', this.analyseForm.get('typologie')!.value);
        formData.append('axe', this.analyseForm.get('axe')!.value);
        formData.append('famille', this.analyseForm.get('famille')!.value);
        formData.append('indice', this.analyseForm.get('indice')!.value);
        formData.append('niveau_risque', this.analyseForm.get('niveau_risque')!.value);
        formData.append('date_evaluation', this.analyseForm.get('date_evaluation')!.value);
        formData.append('opportunite', this.analyseForm.get('opportunite')!.value);
        formData.append('origine', this.analyseForm.get('origine')!.value);
        formData.append('processus', this.analyseForm.get('processus')!.value);
        formData.append('contexte_int', this.analyseForm.get('contexte_int')!.value);
        formData.append('contexte_ext', this.analyseForm.get('contexte_ext')!.value);
        formData.append('consequences', this.analyseForm.get('consequences')!.value);
        formData.append('impact', this.analyseForm.get('impact')!.value);
        formData.append('probabilite', this.analyseForm.get('probabilite')!.value);
        formData.append('maitrise', this.analyseForm.get('maitrise')!.value);
        formData.append('mesure', this.analyseForm.get('mesure')!.value);
        formData.append('type_action', this.analyseForm.get('type_action')!.value);
        formData.append('partieinteresses', String(this.partieId));

      this.analyseservice.updateAnalyseRisqueFormdata(this.idAnalyse,formData).subscribe(
          () => {
            console.log('Analyse a été modifiée avec succès.');
            this.getAnalyseByPartieId(this.partieId);
            
            this.openModal();
            this.updateModalVisible = false;
            this.closeSuccessModalAfterDelay();
          },
          error => console.log(error)
        );
    }
    openUpdateModal(analyse: AnalyseRisques): void {
      this.analyse = analyse;
      this.idAnalyse = this.analyse.id;
      this.analyseForm.patchValue({
        site: this.analyse.site,
        description: this.analyse.description,
        typologie: this.analyse.typologie,
        axe: this.analyse.axe,
        famille: this.analyse.famille,
        indice: this.analyse.indice,
        niveau_risque: this.analyse.niveau_risque,
        date_evaluation: this.analyse.date_evaluation,
        opportunite: this.analyse.opportunite,
        origine: this.analyse.origine,
        processus: this.analyse.processus,
        contexte_int: this.analyse.contexte_int,
        contexte_ext: this.analyse.contexte_ext,
        consequences: this.analyse.consequences,
        impact: this.analyse.impact,
        probabilite: this.analyse.probabilite,
        maitrise: this.analyse.maitrise,
        mesure: this.analyse.mesure,
        type_action: this.analyse.type_action

      });
      const modal = new window.bootstrap.Modal(document.getElementById('updateAnalyse'));
      modal.show();
    }
    addExigenceFormData(): void{
      if (this.exigenceForm.valid) {
        const formData = new FormData();
        formData.append('type_exigence', this.exigenceForm.get('type_exigence')!.value);
        formData.append('intitule', this.exigenceForm.get('intitule')!.value);
        formData.append('evaluation_maitrise', this.exigenceForm.get('evaluation_maitrise')!.value);
        formData.append('description', this.exigenceForm.get('description')!.value);
        formData.append('commentaire', this.exigenceForm.get('commentaire')!.value);
        formData.append('action', this.exigenceForm.get('action')!.value);
        formData.append('partieinteresses', String(this.partieId));
  
        this.exigenceservice.addExigenceFormData(formData).subscribe(
          (response) => {
            console.log('Exigence a été ajouté avec succès.');
            const newExigenceId = response.id;
            console.log('Nouvel ID d\'exigence : ', newExigenceId);
            console.log('FormData:', formData); 
            this.getExigenceByPartieId(this.partieId);
            this.exigenceForm.reset();
            this.openModaladdExigence();
            this.addModalVisible = false;
            this.closeSuccessModalAfterDelay();
          },
          error => console.log(error)
        );
      }
    }
    updateExigence(): void {
      const formData = new FormData();
      formData.append('type_exigence', this.exigenceForm.get('type_exigence')!.value);
      formData.append('intitule', this.exigenceForm.get('intitule')!.value);
      formData.append('evaluation_maitrise', this.exigenceForm.get('evaluation_maitrise')!.value);
      formData.append('description', this.exigenceForm.get('description')!.value);
      formData.append('commentaire', this.exigenceForm.get('commentaire')!.value);
      formData.append('action', this.exigenceForm.get('action')!.value);
      formData.append('partieinteresses', String(this.partieId));

      this.exigenceservice.updateExigenceFormdata(this.idExigence,formData).subscribe(
          () => {
            console.log('Exigence a été modifiée avec succès.');
            this.getExigenceByPartieId(this.partieId);
            
            this.openModalupdate();
            this.updateModalVisible = false;
            this.closeSuccessModalAfterDelay();
          },
          error => console.log(error)
        );
    }
    openUpdateExigenceModal(exigence: Exigences): void {
      this.exigence = exigence;
      this.idExigence = this.exigence.id;
      this.exigenceForm.patchValue({
        type_exigence: this.exigence.type_exigence,
        intitule: this.exigence.intitule,
        evaluation_maitrise: this.exigence.evaluation_maitrise,
        description: this.exigence.description,
        commentaire: this.exigence.commentaire,
        action: this.exigence.action

      });
      const modal = new window.bootstrap.Modal(document.getElementById('updateExigence'));
      modal.show();
    }
    openDeleteModal(id: number) {
      this.idToDelete = id;
      this.deletModal.show();

    }
    openDeleteModalExigence(id: number) {
      this.idToDelete = id;
      this.deletModalexigence.show();

    }
    deleteAnalyse() {
      this.analyseservice.delAnalyseRisque(this.idToDelete).subscribe(() => {
        this.getAnalyseByPartieId(this.partieId);
      })
    }
  
    deleteExigence() {
      this.exigenceservice.delExigence(this.idToDelete).subscribe(() => {
        this.getExigenceByPartieId(this.partieId);
      })
    }
    openModal() {
      this.modalRef = this.bsModalService.show(this.successModal);
    }
    closeModal() {
      this.bsModalService.hide();
      location.reload();
    }
    openModaladdAnalyse() {
      this.modalRef = this.bsModalService.show(this.addModalAnalyse);
    }
    openModaladdExigence() {
      this.modalRef = this.bsModalService.show(this.addModalExigence);
    }
    openModalupdate() {
      this.modalRef = this.bsModalService.show(this.successModalexigence);
    }
    get f() {
      return { ...this.analyseForm.controls, ...this.exigenceForm.controls };
    }
    closeSuccessModalAfterDelay(): void {
      setTimeout(() => {
        this.modalRef.hide();
        location.reload();
      }, 2300); 
    }
}
