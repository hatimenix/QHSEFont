import { Component, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable,  } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { CotationService } from 'src/app/Services/Service-cotation/cotation.service';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
import { Cotation } from 'src/app/models/cotation';
declare var window:any;

@Component({
  selector: 'app-cartographie-risques',
  templateUrl: './cartographie-risques.component.html',
  styleUrls: ['./cartographie-risques.component.css']
})
export class CartographieRisquesComponent {
  updateModalVisible: boolean = true;
  risques: AnalyseRisques[] = [];
  cotations: Cotation[] = [];
  analyseRisqueId!: number;
  @ViewChild('successModal', { static: true }) successModal:any; 
  modalRef!: BsModalRef;
  analyseForm!: FormGroup;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  siteName !: string;
  showModal = false;
  idAnalyse !: number;
  analyse !: AnalyseRisques;
  indice : any;

  constructor(
    private risqueservice: AnalyseRisquesService,
    private cotationservice: CotationService,
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService
  ) {}

  ngOnInit(): void {
    this.getRisques();
    this.getCotations();
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
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
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

    this.risqueservice.updateAnalyseRisqueFormdata(this.idAnalyse,formData).subscribe(
        () => {
          console.log('Analyse a été modifiée avec succès.');
          
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
  getRisques() {
    this.risqueservice.getAllAnalyseRisques().subscribe(
      (res) => {
        this.risques = res;
        this.updateRiskTableVisibility();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCotations() {
    this.cotationservice.getAllCotation().subscribe(
      (res) => {
        this.cotations = res;
        this.updateRiskTableVisibility();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toNumber(value: string): number {
    return parseFloat(value);
  }

  getCotationIPR(analyseRisque: AnalyseRisques): string {
    const cotation = this.cotations.find((c) =>
      c.analyserisque.some((ar) => ar === analyseRisque.id)
    );
    return cotation ? cotation.ipr : '';
  }

  updateRiskTableVisibility() {
  this.risques.length > 0;
  this.risques.some(
      (risque) =>
        this.toNumber(this.getCotationIPR(risque)) >= 0 &&
        this.toNumber(this.getCotationIPR(risque)) <= 5
    );
   this.risques.some(
      (risque) => this.toNumber(this.getCotationIPR(risque)) > 10
    );
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }
}
