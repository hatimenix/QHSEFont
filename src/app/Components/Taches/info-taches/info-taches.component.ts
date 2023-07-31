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
import { ApiTachesService } from 'src/app/Services/Service-document-unique/api-taches.service';
import { Taches } from 'src/app/models/taches';

declare var window:any;

@Component({
  selector: 'app-info-taches',
  templateUrl: './info-taches.component.html',
  styleUrls: ['./info-taches.component.css']
})
export class InfoTachesComponent {
  updateModalVisible: boolean = true;
  addModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  @ViewChild('addModal', { static: true }) addModal:any;
  modalRef!: BsModalRef;
  tacheId !: number;
  tacheForm!: FormGroup;
  actionForm!: FormGroup;
  sites$ !: Observable<any>;
  processus$ !: Observable<any>;
  actions$!: Observable<Actions[]>;
  siteName !: string;
  addedActionId !: number;
  deletModal : any;
  idToDelete: number = 0;
  showModal = false;
  tache!: Taches;
  idAction !: number;
  action !: Actions;
  piece_jointe:any;
  constructor(
    private route: ActivatedRoute,
    private tacheservice:ApiTachesService,
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
    private apiRealisationService: ApiRealisationService,
    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService,
    private apiActionsService: ApiActionsService
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
      assigne_a : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      priorite : ['', Validators.required],
      delai_mesure_eff : ['', Validators.required],
      type_critere_eff : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      detail_critere_eff : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      piece_jointe : ['']
    });
    
    this.tacheId = +this.route.snapshot.params['id'];
    this.tacheservice.get(this.tacheId).subscribe(
      (data: Taches) => {
        this.tache = data;
        this.tacheForm.patchValue({
          nom_tache: this.tache.nom_tache,
          date_debut: this.tache.date_debut,
          echeance: this.tache.echeance,
          description: this.tache.description,
          priorite: this.tache.priorite,
          date_realisation: this.tache.date_realisation,
          etat: this.tache.etat,
          commentaire: this.tache.commentaire,
          piece_jointe: this.tache.piece_jointe,
          utilisateur_name: this.tache.utilisateur_name,
          source_name: this.tache.source_name,

        });
      },
      error => console.log(error)
    );
    this.sites$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();
    this.getActionsByTacheId(this.tacheId);
    
    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteAction')
    );

  }
  download(piece_jointe: string): void {
    this.tacheservice.downloadFile(piece_jointe);
  }
  getActionsByTacheId(tacheId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(action => action.tache.includes(tacheId))),
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
      formData.append('tache', String(this.tacheId));

      this.apiActionsService.addActionFormData(formData).subscribe(
        (response) => {
          console.log('Action a été ajouté avec succès.');
          const newActionId = response.id; // ou tout autre nom de propriété qui contient l'identifiant de l'action ajoutée
          console.log('Nouvel ID d\'action : ', newActionId);
          console.log('piece jointe : ', response.piece_jointe);
          this.getActionsByTacheId(this.tacheId);
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
      formData.append('tache', String(this.tacheId));

      this.apiActionsService.updateActionFormdata(this.idAction,formData).subscribe(
          () => {
            console.log('Action a été modifiée avec succès.');
            this.getActionsByTacheId(this.tacheId);
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
      this.getActionsByTacheId(this.tacheId);
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
}
