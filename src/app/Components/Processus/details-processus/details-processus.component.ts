import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
import { Processus } from 'src/app/models/pocesus';

declare var window:any;
@Component({
  selector: 'app-details-processus',
  templateUrl: './details-processus.component.html',
  styleUrls: ['./details-processus.component.css']
})
export class DetailsProcessusComponent {
  id!: number;
  currentId:any
  @ViewChild('successModal', { static: true }) successModal:any; 
  @ViewChild('addModalAnalyse', { static: true }) addModalAnalyse:any;
  updateModalVisible: boolean = true;
  addModalVisible: boolean = true;
  processusId !: number;
  processusForm!: FormGroup;
  analyseForm!: FormGroup;
  sites$ !: Observable<any>;
  analyserisques$!: Observable<AnalyseRisques[]>;
  siteName !: string;
  addedAnalyseId !: number;
  deletModal : any;
  idToDelete: number = 0;
  showModal = false;
  processus!: Processus;
  idAnalyse !: number;
  analyse !: AnalyseRisques;
  indice : any;
  modalRef: any;

  constructor
  (private processusService: ProcessusService, 
    private route: ActivatedRoute,
    
    private formBuilder: FormBuilder,

    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService,
    private analyseservice: AnalyseRisquesService,
      )    {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.processusService.getProcessusById(this.id).subscribe(proc => {
          this.currentId = proc;
        });
      }
    });
    this.analyseForm = this.formBuilder.group({ 
      site : ['', Validators.required],
      description : ['', Validators.required],
      typologie : ['', Validators.required],
      axe : ['', Validators.required],
      famille : ['', Validators.required],
      indice : ['', Validators.required],
      niveau_risque : ['', Validators.required],
      date_evaluation : ['', Validators.required],
      opportunite : ['', Validators.required],
      origine : ['', Validators.required],
      contexte_int : ['', Validators.required],
      contexte_ext : ['', Validators.required],
      consequences : ['', Validators.required],
      impact : ['', Validators.required],
      probabilite : ['', Validators.required],
      maitrise : ['', Validators.required],
      mesure : ['', Validators.required],
      type_action : ['', Validators.required],
      

    });


    this.processusId = +this.route.snapshot.params['id'];
    this.processusService.getProcessusById(this.processusId).subscribe(
      (data: Processus) => {
        this.processus = data;
        this.processusForm.patchValue({
          intitule: this.processus. intitule,
          typologie: this.processus.typologie,
          sigle: this.processus.sigle,
          finalite: this.processus. finalite,
          pilote: this.processus.pilote,
          acteurs: this.processus.acteurs,
          donnee_entree: this.processus.donnee_entree,
          activites: this.processus.activites,
          donnee_sortie: this.processus.donnee_sortie,
          ressources_tech_org: this.processus.ressources_tech_org,
          objectifs_ind: this.processus.objectifs_ind,
          outils_surveil: this.processus.outils_surveil,
          pilote_name: this.processus. pilote_name,

        });
      },
      error => console.log(error)
    );
    this.sites$ = this.apiSiteService.getAllSite();
    this.getAnalyseByProcessusId(this.processusId);




 this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAnalyse')
    );
  }
  getAnalyseByProcessusId(processusId: number) {
    this.analyserisques$ = this.analyseservice.getAllAnalyseRisques().pipe(
      map((analyserisques: AnalyseRisques[]) => analyserisques.filter(analyse => analyse.processus.includes(processusId))),
    )}


//analyse functions 
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
    formData.append('contexte_int', this.analyseForm.get('contexte_int')!.value);
    formData.append('contexte_ext', this.analyseForm.get('contexte_ext')!.value);
    formData.append('consequences', this.analyseForm.get('consequences')!.value);
    formData.append('impact', this.analyseForm.get('impact')!.value);
    formData.append('probabilite', this.analyseForm.get('probabilite')!.value);
    formData.append('maitrise', this.analyseForm.get('maitrise')!.value);
    formData.append('mesure', this.analyseForm.get('mesure')!.value);
    formData.append('type_action', this.analyseForm.get('type_action')!.value);
    formData.append('processus', String(this.processusId));

    this.analyseservice.addAnalyseRisque(formData).subscribe(
      (response) => {
        console.log('Analyse risque a été ajouté avec succès.');
        const newAnalyseId = response.id;
        console.log('Nouvel ID d\'analyse : ', newAnalyseId);
        console.log('FormData:', formData); 
        this.getAnalyseByProcessusId(this.processusId);
        this.analyseForm.reset();
        this.openModaladdAnalyse();
        this.addModalVisible = false;
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
    formData.append('contexte_int', this.analyseForm.get('contexte_int')!.value);
    formData.append('contexte_ext', this.analyseForm.get('contexte_ext')!.value);
    formData.append('consequences', this.analyseForm.get('consequences')!.value);
    formData.append('impact', this.analyseForm.get('impact')!.value);
    formData.append('probabilite', this.analyseForm.get('probabilite')!.value);
    formData.append('maitrise', this.analyseForm.get('maitrise')!.value);
    formData.append('mesure', this.analyseForm.get('mesure')!.value);
    formData.append('type_action', this.analyseForm.get('type_action')!.value);
    formData.append('processus', String(this.processusId));

  this.analyseservice.updateAnalyseRisqueFormdata(this.idAnalyse,formData).subscribe(
      () => {
        console.log('Analyse a été modifiée avec succès.');
        this.getAnalyseByProcessusId(this.processusId);
        
        this.openModal();
        this.updateModalVisible = false;
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


openDeleteModal(id: number) {
  this.idToDelete = id;
  this.deletModal.show();

}


deleteAnalyse() {
  this.analyseservice.delAnalyseRisque(this.idToDelete).subscribe(() => {
    this.getAnalyseByProcessusId(this.processusId);
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


}
