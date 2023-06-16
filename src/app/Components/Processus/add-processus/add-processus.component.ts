import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { Processus } from 'src/app/models/pocesus';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';

declare var window:any;

@Component({
  selector: 'app-add-processus',
  templateUrl: './add-processus.component.html',
  styleUrls: ['./add-processus.component.css']
})
export class AddProcessusComponent implements OnInit{
  processusForm!: FormGroup;
  personnel$ !: Observable<any>;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  indice : any;
  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  @ViewChild('addModalAnalyse', { static: true }) addModalAnalyse:any;
  modalRef!: BsModalRef;
  formBuilder: any;

    //analyse Risque 
    processusId !: number;
    analyseForm!: FormGroup;
    analyserisques$!: Observable<AnalyseRisques[]>;
    addedAnalyseId !: number;
    idAnalyse !: number;
    analyse !: AnalyseRisques;
    updateModalVisible: boolean = true;
    addModalVisible: boolean = true;

  constructor(private fb: FormBuilder, private processusService: ProcessusService,
     private router: Router,
     private personnelService: PersonnelService,
     private bsModalService: BsModalService, 
     private analyseservice: AnalyseRisquesService, 
     private apiSiteService: ApiSiteService,
     private apiProcessusService: ApiProcessusService,
     ) {
      this.createForm();
    
  }

  ngOnInit(): void {

    //analyse form
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
      processus : ['', Validators.required],
      contexte_int : ['', Validators.required],
      contexte_ext : ['', Validators.required],
      consequences : ['', Validators.required],
      impact : ['', Validators.required],
      probabilite : ['', Validators.required],
      maitrise : ['', Validators.required],
      mesure : ['', Validators.required],
      type_action : ['', Validators.required],

    });

    //fin analyse form
    this.getAnalyseByPartieId(this.processusId);
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }
    // aller en haut de la page
    window.scrollTo(0, 0);
    this.personnel$ = this.personnelService.getPersonnels();
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
    this.createForm();
  }

  createForm(){
    this.processusForm = this.fb.group({
      intitule: ['', Validators.required],
      sigle: ['',Validators.required],
      typologie: ['',Validators.required],
      finalite:['',Validators.required],
      pilote:['',Validators.required],
      acteurs: ['',Validators.required],
      donnee_entree:['',Validators.required],
      activites: ['', Validators.required], 
      donnee_sortie:['',Validators.required],
      ressources_tech_org:['',Validators.required],
      objectifs_ind:['',Validators.required],
      outils_surveil:['',Validators.required],
      
    });
  }
  onSubmit():void {
    const formData = this.processusForm.value;
    const processus: Processus= new Processus (
      formData.intitule,
      formData.sigle,
      formData.typologie,
      formData.finalite,
      formData.pilote,
      formData.acteurs,
      formData.donnee_entree,
      formData.activites,
      formData.donnee_sortie,
      formData.ressources_tech_org,
      formData.objectifs_ind,
      formData.outils_surveil,
      
    );
      
    
    this.processusService.addProcessus(processus).subscribe(
      () => {      
        console.log("Le processus a été ajouté avec succès");
        console.log(processus);
        this.openModal();
        this.router.navigate(['/listProcessus']); 
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de l'ajout de processus", error);        
      }
    );
  }
  //modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}

//analyse Risque
  getAnalyseByPartieId(processusId: number) {
    this.analyserisques$ = this.analyseservice.getAllAnalyseRisques().pipe(
      map((analyserisques: AnalyseRisques[]) => analyserisques.filter(analyse => analyse.processus.includes(processusId))),
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
        formData.append('partieinteresses', String(this.processusId));
  
        this.analyseservice.addAnalyseRisque(formData).subscribe(
          (response) => {
            console.log('Analyse risque a été ajouté avec succès.');
            const newAnalyseId = response.id;
            console.log('Nouvel ID d\'analyse : ', newAnalyseId);
            console.log('FormData:', formData); 
            this.getAnalyseByPartieId(this.processusId);
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
        formData.append('processus', this.analyseForm.get('processus')!.value);
        formData.append('contexte_int', this.analyseForm.get('contexte_int')!.value);
        formData.append('contexte_ext', this.analyseForm.get('contexte_ext')!.value);
        formData.append('consequences', this.analyseForm.get('consequences')!.value);
        formData.append('impact', this.analyseForm.get('impact')!.value);
        formData.append('probabilite', this.analyseForm.get('probabilite')!.value);
        formData.append('maitrise', this.analyseForm.get('maitrise')!.value);
        formData.append('mesure', this.analyseForm.get('mesure')!.value);
        formData.append('type_action', this.analyseForm.get('type_action')!.value);
        formData.append('partieinteresses', String(this.processusId));

      this.analyseservice.updateAnalyseRisqueFormdata(this.idAnalyse,formData).subscribe(
          () => {
            console.log('Analyse a été modifiée avec succès.');
            this.getAnalyseByPartieId(this.processusId);
            
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
    openModaladdAnalyse() {
      this.modalRef = this.bsModalService.show(this.addModalAnalyse);
    }
}
