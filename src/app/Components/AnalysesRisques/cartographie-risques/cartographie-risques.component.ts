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
type OptionType = 'type_action';
interface Option {
  label: string;
  value: string;
  checked: boolean;
  type: OptionType;
}


@Component({
  selector: 'app-cartographie-risques',
  templateUrl: './cartographie-risques.component.html',
  styleUrls: ['./cartographie-risques.component.css']
})
export class CartographieRisquesComponent {
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  faiblePagination!: {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    p: number;
  };
  moderatePagination!: {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    p: number;
  };
  highPagination!: {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    p: number;
  };
  evaluatePagination!: {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    p: number;
  };
  
  get totalFaiblePages(): number {
    const filteredRisques = this.risques.filter(analyseRisque => {
      const cotationIPR = this.getCotationIPR(analyseRisque);
      const cotationValue = this.toNumber(cotationIPR);
      return cotationValue < 5;
    });
    return Math.ceil(filteredRisques.length / this.faiblePagination.itemsPerPage);
  }
  get DisplayedFaibleRisques(): AnalyseRisques[] {
    const startIndex = (this.faiblePagination.p - 1) * this.faiblePagination.itemsPerPage;
    const endIndex = startIndex + this.faiblePagination.itemsPerPage;
    const filteredRisques = this.risques.filter(analyseRisque => {
      const cotationIPR = this.getCotationIPR(analyseRisque);
      const cotationValue = this.toNumber(cotationIPR);
      return cotationValue < 5;
    });
    return filteredRisques.slice(startIndex, endIndex);
  }
  get totalModeratePages(): number {
    const filteredRisques = this.risques.filter(analyseRisque => {
      const cotationIPR = this.getCotationIPR(analyseRisque);
      const cotationValue = this.toNumber(cotationIPR);
      return cotationValue >= 5 && cotationValue <= 10;
    });
    return Math.ceil(filteredRisques.length / this.moderatePagination.itemsPerPage);
  }
  
  get displayedModerateRisques(): AnalyseRisques[] {
    const startIndex = (this.moderatePagination.p - 1) * this.moderatePagination.itemsPerPage;
    const endIndex = startIndex + this.moderatePagination.itemsPerPage;
    const filteredRisques = this.risques.filter(analyseRisque => {
      const cotationIPR = this.getCotationIPR(analyseRisque);
      const cotationValue = this.toNumber(cotationIPR);
      return cotationValue >= 5 && cotationValue <= 10;
    });
    return filteredRisques.slice(startIndex, endIndex);
  }
  get totalHighPages(): number {
    const filteredRisques = this.risques.filter(analyseRisque => {
      const cotationIPR = this.getCotationIPR(analyseRisque);
      const cotationValue = this.toNumber(cotationIPR);
      return cotationValue > 10;
    });
    return Math.ceil(filteredRisques.length / this.highPagination.itemsPerPage);
  }
  
  get displayedHighRisques(): AnalyseRisques[] {
    const startIndex = (this.highPagination.p - 1) * this.highPagination.itemsPerPage;
    const endIndex = startIndex + this.highPagination.itemsPerPage;
    const filteredRisques = this.risques.filter(analyseRisque => {
      const cotationIPR = this.getCotationIPR(analyseRisque);
      const cotationValue = this.toNumber(cotationIPR);
      return cotationValue > 10;
    });
    return filteredRisques.slice(startIndex, endIndex);
  }
  get totalEvaluatePages(): number {
    const filteredRisques = this.risques.filter(analyseRisque => {
      const cotationIPR = this.getCotationIPR(analyseRisque);
      return cotationIPR === '' || cotationIPR === null;
    });
    return Math.ceil(filteredRisques.length / this.evaluatePagination.itemsPerPage);
  }
  
  get displayedEvaluateRisques(): AnalyseRisques[] {
    const startIndex = (this.evaluatePagination.p - 1) * this.evaluatePagination.itemsPerPage;
    const endIndex = startIndex + this.evaluatePagination.itemsPerPage;
    const filteredRisques = this.risques.filter(analyseRisque => {
      const cotationIPR = this.getCotationIPR(analyseRisque);
      return cotationIPR === '' || cotationIPR === null;
    });
    return filteredRisques.slice(startIndex, endIndex);
  }
  
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
  deletModal : any;
  idToDelete: number = 0;
  type_action: string[] = [];

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
      type_action : [''],

    });
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
    this.faiblePagination = {
      itemsPerPageOptions: this.itemsPerPageOptions,
      itemsPerPage: this.itemsPerPageOptions[0],
      p: 1
    };
    this.moderatePagination = {
      itemsPerPageOptions: this.itemsPerPageOptions,
      itemsPerPage: this.itemsPerPageOptions[0],
      p: 1
    };
    this.highPagination = {
      itemsPerPageOptions: this.itemsPerPageOptions,
      itemsPerPage: this.itemsPerPageOptions[0],
      p: 1
    };
    this.evaluatePagination = {
      itemsPerPageOptions: this.itemsPerPageOptions,
      itemsPerPage: this.itemsPerPageOptions[0],
      p: 1
    };
    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAnalyse')
    );
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
      const selectedTypeAction = this.options.filter(option => option.checked).map(option => option.value);
      const typeActionString = selectedTypeAction.join(',');
      formData.append('type_action', typeActionString);
    this.risqueservice.updateAnalyseRisqueFormdata(this.idAnalyse,formData).subscribe(
        () => {
          console.log('Analyse a été modifiée avec succès.');
          
          this.openModal();
          this.updateModalVisible = false;
          this.closeSuccessModalAfterDelay();
        },
        error => console.log(error)
      );
  }
  get f() {
    return this.analyseForm.controls;
  }
  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deletModal.show();

  }
  deleteAnalyse() {
    this.risqueservice.delAnalyseRisque(this.idToDelete).subscribe({
      next: (data) => {
        this.risques = this.risques.filter(_ => _.id != this.idToDelete)
        location.reload()
        this.deletModal.hide();
      },
      error:(err) => {
        console.log(err);
      }
      
    });
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
    this.options.forEach((option) => {
      option.checked = this.analyse.type_action.includes(option.value);
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
  onFaibleItemsPerPageChange(option: number) {
    this.faiblePagination.p = 1;
    this.faiblePagination.itemsPerPage = option;
  }
  
  getPageNumbersForFaible(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalFaiblePages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  onModerateItemsPerPageChange(option: number) {
    this.moderatePagination.p = 1;
    this.moderatePagination.itemsPerPage = option;
  }
  
  getPageNumbersForModerate(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalModeratePages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  onHighItemsPerPageChange(option: number) {
    this.highPagination.p = 1;
    this.highPagination.itemsPerPage = option;
  }
  
  getPageNumbersForHigh(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalHighPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  onEvaluateItemsPerPageChange(option: number) {
    this.evaluatePagination.p = 1;
    this.evaluatePagination.itemsPerPage = option;
  }
  
  getPageNumbersForEvaluate(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalEvaluatePages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  closeSuccessModalAfterDelay(): void {
    setTimeout(() => {
      this.modalRef.hide();
      location.reload();
    }, 2300); 
  }
  options: Option[] = [
    { label: "Abandon de l'activité concernée par le risque", value: "Abandon de l'activité concernée par le risque", checked: false, type: 'type_action' },
    { label: 'Acceptation du risque dans le but de poursuivre une opportunité (on accepte le risque)', value: 'Acceptation du risque dans le but de poursuivre une opportunité (on accepte le risque)', checked: false, type: 'type_action' },
    { label: 'Elimination de la source du risque', value: 'Elimination de la source du risque', checked: false, type: 'type_action' },
    { label: "Modification de la probabilité d'apparition du risque (vraisemblance)", value: "Modification de la probabilité d'apparition du risque (vraisemblance)", checked: false, type: 'type_action' },
    { label: 'Modification des conséquences', value: 'Modification des conséquences', checked: false, type: 'type_action' },
    { label: "Partage du risque avec d'autres parties intéressées (assurance, clients, etc...)", value: "Partage du risque avec d'autres parties intéressées (assurance, clients, etc...)", checked: false, type: 'type_action' },
  ];

  toggleCheckbox(checkboxValue: string, optionType: string): void {
    const option = this.options.find(opt => opt.value === checkboxValue && opt.type === optionType);

    if (option) {
      option.checked = !option.checked;
      this.updateCheckboxes(optionType);
    }
  }

  isCheckboxChecked(checkboxValue: string, optionType: string): boolean {
    const option = this.options.find(opt => opt.value === checkboxValue && opt.type === optionType);
    return option ? option.checked : false;
  }
  
  updateCheckboxes(optionType: string): void {
    if (optionType === 'type_action') {
      this.type_action = this.options
        .filter(opt => opt.type === 'type_action' && opt.checked)
        .map(opt => opt.value);
    } 
  }

  getOptions(type: string): Option[] {
    return this.options.filter(option => option.type === type);
  }
}
