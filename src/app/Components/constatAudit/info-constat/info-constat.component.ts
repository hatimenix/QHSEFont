import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ConstatAuditService } from 'src/app/Services/Service-constatAudit/constat-audit.service';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiRealisationService } from 'src/app/Services/Service-document-unique/api-realisation.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
import { Actions } from 'src/app/models/actions';
import { ConstatAudit } from 'src/app/models/constat-audit';
import { Realisations } from 'src/app/models/realisations';
import { Site } from 'src/app/models/Site';
import { Utilsateur } from 'src/app/models/utilsateur';
import { Validators } from '@angular/forms';
import { ApiProcessusService } from 'src/app/Services/Service-document-unique/api-processus.service';

declare var window: any;
@Component({
  selector: 'app-info-constat',
  templateUrl: './info-constat.component.html',
  styleUrls: ['./info-constat.component.css']
})
export class InfoConstatComponent {
  updateModalVisible: boolean = true;
  addModalVisible: boolean = true;
  constatId !: number;
  ca!: ConstatAudit;
  utilisateurs: any[] = [];
  selectedUtilisateur: Utilsateur | undefined

  responsable_traitement: number[] = []

  sites: any[] = [];
  selectedSite: Site | undefined;

  modalRef!: BsModalRef;
  @ViewChild('utilisateurModal', { static: true }) utilisateurModal: any;
  @ViewChild('siteModal', { static: true }) siteModal: any;
  @ViewChild('successModal', { static: true }) successModal: any;
  @ViewChild('addModal', { static: true }) addModal: any;

  idAction !: number;
  action !: Actions;

  actions$!: Observable<Actions[]>;
  sitess$ !: Observable<any>;
  processus$ !: Observable<any>;

  caForm!: FormGroup;




  intitule_constat: any
  type_constat: any
  audit_associe: any
  site: any
  // responsable_traitement: number[] = []
  processus: any
  date_reponse: any
  localisation: any
  type_audit: any
  rapport_audit: any
  description_constat: any

  actionForm!: FormGroup;

  deletModal: any;
  idToDelete: number = 0;
  piece_jointe: any


  constructor(
    private route: ActivatedRoute,
    private caservice: ConstatAuditService,

    private utilisateurservice: ApiUtilisateurService,
    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService,
    private apiActionsService: ApiActionsService,
    private apiRealisationService: ApiRealisationService,
    private formBuilder: FormBuilder,
    private apiProcessusService: ApiProcessusService,
  ) { }
  ngOnInit() {



    this.actionForm = this.formBuilder.group({
      intitule: ['', Validators.required],
      type_action: ['', Validators.required],
      origine_action: ['', Validators.required],
      reference: ['', Validators.required],
      domaine: ['', Validators.required],
      site: ['', Validators.required],
      processus: ['', Validators.required],
      analyse_cause: ['', Validators.required],
      plan_action: ['', Validators.required],
      delai_mise_en_oeuvre: ['', Validators.required],
      assigne_a: ['', Validators.required],
      priorite: ['', Validators.required],
      delai_mesure_eff: ['', Validators.required],
      type_critere_eff: ['', Validators.required],
      detail_critere_eff: ['', Validators.required],
      piece_jointe: ['']
    });



    this.constatId = +this.route.snapshot.params['id'];
    this.caservice.getConstatAuditById(this.constatId).subscribe(
      (data: ConstatAudit) => {
        this.ca = data;
        this.caForm.patchValue({
          intitule_constat: this.ca.intitule_constat,
          type_constat: this.ca.type_constat,
          audit_associe: this.ca.audit_associe,
          site: this.ca.site,
          processus: this.ca.processus,
          date_reponse: this.ca.date_reponse,
          localisation: this.ca.localisation,
          type_audit: this.ca.type_audit,
          rapport_audit: this.ca.rapport_audit,
          description_constat: this.ca.description_constat,


        });
      },
      error => console.log(error)
    );

    // this.caservice.getConstatAuditById(this.constatId).subscribe(
    //   (data: ConstatAudit) => {
    //     this.constat = data;
    //   },
    //   error => console.log(error)
    // );

    this.utilisateurservice.getAllUtilsateur().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs);
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );


    this.apiSiteService.getAllSite().subscribe(
      (data: any[]) => {
        this.sites = data;
        this.selectedSite = this.sites[0]; // Assign the first site from the array
        console.log(this.sites); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
    this.getActionsByconstatId(this.constatId);

    this.sitess$ = this.apiSiteService.getAllSite();
    this.processus$ = this.apiProcessusService.getAllProcessus();

  }




  isResponsableSelected(responsable_traitementId: number): boolean {
    return this.responsable_traitement.includes(responsable_traitementId);
  }
  toggleResponsable(responsable_traitementId: number): void {
    const index = this.responsable_traitement.indexOf(responsable_traitementId);
    if (index > -1) {
      this.responsable_traitement.splice(index, 1);
    } else {
      this.responsable_traitement.push(responsable_traitementId);
    }
  }

  openUtilisateurModal(utilisateur: Utilsateur) {
    this.selectedUtilisateur = utilisateur;
    this.modalRef = this.bsModalService.show(this.utilisateurModal);
  }
  closeModalutilisateur() {
    this.bsModalService.hide();
  }

  openSiteModal(site: Site) {
    this.selectedSite = site;
    this.modalRef = this.bsModalService.show(this.siteModal);
  }
  closeModalsite() {
    this.bsModalService.hide();
  }

  getSiteById(siteId: number): any {
    const site = this.sites.find((s: any) => s.id === siteId);
    return site;
  }


  getActionsByconstatId(constatId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(action => action.ca.includes(constatId))),
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

  getSelectedFileName(): string {
    const fileInput = document.getElementById('customFile') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      return fileInput.files[0].name;
    }
    return 'Choose file';
  }
  openModaladd() {
    this.modalRef = this.bsModalService.show(this.addModal);
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }

  addActionFormData(): void {
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
      formData.append('ca', String(this.constatId));

      this.apiActionsService.addActionFormData(formData).subscribe(
        (response) => {
          console.log('Action a été ajouté avec succès.');
          const newActionId = response.id; // ou tout autre nom de propriété qui contient l'identifiant de l'action ajoutée
          console.log('Nouvel ID d\'action : ', newActionId);
          console.log('piece jointe : ', response.piece_jointe);
          this.getActionsByconstatId(this.constatId);
          this.actionForm.reset();
          this.openModaladd();
          this.addModalVisible = false;
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
    } formData.append('intitule', this.actionForm.get('intitule')!.value);
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
    formData.append('ca', String(this.constatId));

    this.apiActionsService.updateActionFormdata(this.idAction, formData).subscribe(
      () => {
        console.log('Analyse a été modifiée avec succès.');
        this.getActionsByconstatId(this.constatId);
        this.openModal();
        this.updateModalVisible = false;
      },
      error => console.log(error)
    );
  }






  deleteAction() {
    this.apiActionsService.delAction(this.idToDelete).subscribe(() => {
      this.getActionsByconstatId(this.constatId);
    })
  }

  updateFile(event: any) {
    const file = event.target.files[0];
    this.piece_jointe = file

  }
  onFileSelectedAction(event: any) {
    const file: File = event.target.files[0];
    this.actionForm.get('piece_jointe')?.setValue(file);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }

}
