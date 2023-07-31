import { Component, ViewChild, } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-risques',
  templateUrl: './add-risques.component.html',
  styleUrls: ['./add-risques.component.css']
})
export class AddRisquesComponent {
  risques: any[] = [];
  @ViewChild('addModalAnalyse', { static: true }) addModalAnalyse:any;
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
    private router : Router,
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService,
    private analyseservice: AnalyseRisquesService,
  ) {}
  ngOnInit() {
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }

    // aller en haut de la page
    window.scrollTo(0, 0);
    this.analyseservice.getAllAnalyseRisques().subscribe(
      (data: any[]) => {
        this.risques = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
    this.analyseForm = this.formBuilder.group({ 
      site : ['', Validators.required],
      description : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255),this.checkDuplicatedescription.bind(this)]],
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
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
  }
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

      this.analyseservice.addAnalyseRisque(formData).subscribe(
        (response) => {
          this.router.navigate(["/cartographieRisque"])
          this.analyseForm.reset();
          this.openModaladdAnalyse();
          this.closeSuccessModalAfterDelay();
        },
        error => console.log(error)
      );
    }
  }
  openModaladdAnalyse() {
    this.modalRef = this.bsModalService.show(this.addModalAnalyse);
  }
  closeModal() {
    this.bsModalService.hide();
  }
  get f() {
    return this.analyseForm.controls;
  }
  checkDuplicatedescription(control: AbstractControl): { [key: string]: boolean } | null {
    const descriptionValue = control.value;
    const isDuplicate = this.risques.some(item => item.description === descriptionValue);
    return isDuplicate ? { 'duplicate': true } : null;
  }
  closeSuccessModalAfterDelay(): void {
    setTimeout(() => {
      this.modalRef.hide();
    }, 2300); 
  }
}
