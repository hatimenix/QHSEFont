import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Actions } from 'src/app/models/actions';
import { ApiRealisationService } from 'src/app/Services/Service-document-unique/api-realisation.service';
import { Realisations } from 'src/app/models/realisations';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { Nc } from 'src/app/models/nc';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';

declare var window:any;

@Component({
  selector: 'app-info-nc',
  templateUrl: './info-nc.component.html',
  styleUrls: ['./info-nc.component.css']
})
export class InfoNcComponent implements OnInit {
  updateModalVisible: boolean = true;
  addModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  @ViewChild('addModal', { static: true }) addModal:any;
  modalRef!: BsModalRef;
  ncId !: number;
  currentNc: any;
  ncForm!: FormGroup;
  actionForm!: FormGroup;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  utilisateurs$ !: Observable<any>;
  actions$!: Observable<Actions[]>;
  siteName !: string;
  addedActionId !: number;
  deletModal : any;
  idToDelete: number = 0;
  showModal = false;
  nc!: Nc;
  idAction !: number;
  action !: Actions;
  piece_jointe:any

  constructor(
    private route: ActivatedRoute,
    private ncservice : ServicesNonConfirmitéService,
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private apiRealisationService: ApiRealisationService,
    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService,
    private apiActionsService: ApiActionsService,
    private apiUtilisateurService: ApiUtilisateurService

  ) {}

  ngOnInit() {
    this.actionForm = this.formBuilder.group({ 
      intitule : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      type_action : ['', Validators.required],
      origine_action : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      reference : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      domaine : ['', Validators.required],
      site : ['', Validators.required],
      processus : ['', Validators.required],
      analyse_cause : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      plan_action : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      delai_mise_en_oeuvre : ['', Validators.required],
      assigne_a :['', Validators.required],
      priorite : ['', Validators.required],
      delai_mesure_eff : ['', Validators.required],
      type_critere_eff : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      detail_critere_eff : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      piece_jointe : ['']
    });
    
    this.ncId = +this.route.snapshot.params['id'];

    this.ncservice.get(this.ncId).subscribe(
      (data: Nc) => {
        this.nc = data;
        this.ncForm.patchValue({
          intitule: this.nc.intitule,
          nature: this.nc.nature,
          domaine: this.nc.domaine,
          date_nc: this.nc.date_nc,
          processus_name: this.nc.processus_name,
          site_name: this.nc.site_name,
          date_prise_en_compte: this.nc.date_prise_en_compte,
          annee: this.nc.annee,
          mois: this.nc.mois,
          detail_cause: this.nc.detail_cause,
          delai_prevu: this.nc.delai_prevu,
          type_cause: this.nc.type_cause,
          cout: this.nc.cout,
          progress: this.nc.progress,
          info_complementaires: this.nc.info_complementaires,
          piece_jointe: this.nc.piece_jointe,
          frequence: this.nc.frequence,
          gravite: this.nc.gravite,
          action_immediate: this.nc.action_immediate,
          nc_cloture: this.nc.nc_cloture,
          responsable_name: this.nc.responsable_name

        });
      },
      error => console.log(error)
    );
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
    this.utilisateurs$ = this.apiUtilisateurService.getAllUtilsateur();
    this.sites$.subscribe((sites) => {
      const site = sites.find((s:any) => s.id === this.nc.site);
      if (site) {
        this.siteName = site.site_nom;
      }
    });
    this.getActionsByNcId(this.ncId);
    
    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAction')
    );

  }
  getActionsByNcId(ncId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(action => action.nc.includes(ncId))),
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
      formData.append('nc', String(this.ncId));

      this.apiActionsService.addActionFormData(formData).subscribe(
        (response) => {
          console.log('Action a été ajouté avec succès.');
          const newActionId = response.id; // ou tout autre nom de propriété qui contient l'identifiant de l'action ajoutée
          console.log('Nouvel ID d\'action : ', newActionId);
          console.log('piece jointe : ', response.piece_jointe);
          this.getActionsByNcId(this.ncId);
          this.actionForm.reset();
          this.openModaladd();
          this.addModalVisible = false;
          this.closeSuccessModalAfterDelay();
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
      formData.append('nc', String(this.ncId));

      this.apiActionsService.updateActionFormdata(this.idAction,formData).subscribe(
          () => {
            console.log('Analyse a été modifiée avec succès.');
            this.getActionsByNcId(this.ncId);
            this.openModal();
            this.updateModalVisible = false;
            this.closeSuccessModalAfterDelay();
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
  

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deletModal.show();
  }

  deleteAction() {
    this.apiActionsService.delAction(this.idToDelete).subscribe(() => {
      this.getActionsByNcId(this.ncId);
    })
  }
  onFileSelectedAction(event: any) {
    const file: File = event.target.files[0];
    this.actionForm.get('piece_jointe')?.setValue(file);
  }
  updateFile(event: any) {
    const file = event.target.files[0];
    this.piece_jointe=file
  
  }
    openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }
  openModaladd() {
    this.modalRef = this.bsModalService.show(this.addModal);
  }
  getSelectedFileName(): string {
    const fileInput = document.getElementById('customFile') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      return fileInput.files[0].name;
    }
    return 'Choose file';
  }
  get f() {
    return this.actionForm.controls;
  }
  closeSuccessModalAfterDelay(): void {
    setTimeout(() => {
      this.modalRef.hide();
      location.reload();
    }, 2300); 
  }
  resetFormOnOutsideClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.modal-dialog')) {
      this.actionForm.reset();
    }
  }
  onEscKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.actionForm.reset();
    }
  }
}
