import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ReunionService } from 'src/app/Services/Service-reunion/reunion.service';
import { Reunion } from 'src/app/models/Reunion';
declare var window: any;

@Component({
  selector: 'app-info-reunion',
  templateUrl: './info-reunion.component.html',
  styleUrls: ['./info-reunion.component.css']
})
export class InfoReunionComponent implements OnInit {
  updateModalVisible: boolean = true;
  addModalVisible: boolean = true;
  reunionId !: number;
  rn!: Reunion;
  utilisateurs: any[] = [];
  selectedUtilisateur: Utilsateur | undefined

  presents: number[] = []
  liste_diffusion: number[] = []
  piece_jointe: any
  processus$ !: Observable<any>;

  sitess$ !: Observable<any>;

  sites: any[] = [];
  selectedSite: Site | undefined;
  modalRef!: BsModalRef;
  @ViewChild('utilisateurModal', { static: true }) utilisateurModal: any;
  @ViewChild('successModal', { static: true }) successModal: any;
  @ViewChild('addModal', { static: true }) addModal: any;

  idAction !: number;
  action !: Actions;

  actions$!: Observable<Actions[]>;

  rnForm!: FormGroup;




  titre: any
  type_reunion: any
  date_previsionnelle_reunion: any
  date_realisation_reunion: any
  personnes_exterieurs: any
  ordre_jour: any

  actionForm!: FormGroup;

  deletModal: any;
  idToDelete: number = 0;
  site: any
  processus: any


  constructor(
    private route: ActivatedRoute,
    private rnservice: ReunionService,

    private utilisateurservice: ApiUtilisateurService,
    private bsModalService: BsModalService,
    private apiActionsService: ApiActionsService,
    private apiRealisationService: ApiRealisationService,
    private formBuilder: FormBuilder,
    private apiSiteService: ApiSiteService,
    private apiProcessusService: ApiProcessusService,


  ) { }
  ngOnInit(): void {




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


    this.reunionId = +this.route.snapshot.params['id'];
    this.rnservice.getReunionById(this.reunionId).subscribe(
      (data: Reunion) => {
        this.rn = data;
        this.rnForm.patchValue({
          titre: this.rn.titre,
          type_reunion: this.rn.type_reunion,
          date_previsionnelle_reunion: this.rn.date_previsionnelle_reunion,
          date_realisation_reunion: this.rn.date_realisation_reunion,
          personnes_exterieurs: this.rn.personnes_exterieurs,
          ordre_jour: this.rn.ordre_jour,



        });
      },
      error => console.log(error)
    );

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

    this.sitess$ = this.apiSiteService.getAllSite();

    this.getActionsByReunion(this.reunionId);

    this.processus$ = this.apiProcessusService.getAllProcessus();


  }
  getSiteById(siteId: number): any {
    const site = this.sites.find((s: any) => s.id === siteId);
    return site;
  }
  isPresentSelected(presentsId: number): boolean {
    return this.presents.includes(presentsId);
  }
  togglePresent(presentsId: number): void {
    const index = this.presents.indexOf(presentsId);
    if (index > -1) {
      this.presents.splice(index, 1);
    } else {
      this.presents.push(presentsId);
    }
  }


  isListDiffSelected(liste_diffusionId: number): boolean {
    return this.liste_diffusion.includes(liste_diffusionId);
  }
  toggleListDiff(liste_diffusionId: number): void {
    const index = this.liste_diffusion.indexOf(liste_diffusionId);
    if (index > -1) {
      this.liste_diffusion.splice(index, 1);
    } else {
      this.liste_diffusion.push(liste_diffusionId);
    }
  }


  openUtilisateurModal(utilisateur: Utilsateur) {
    this.selectedUtilisateur = utilisateur;
    this.modalRef = this.bsModalService.show(this.utilisateurModal);
  }
  closeModalutilisateur() {
    this.bsModalService.hide();
  }
  getActionsByReunion(reunionId: number) {
    this.actions$ = this.apiActionsService.getAllActions().pipe(
      map((actions: Actions[]) => actions.filter(action => action.rn.includes(reunionId))),
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
      formData.append('rn', String(this.reunionId));

      this.apiActionsService.addActionFormData(formData).subscribe(
        (response) => {
          console.log('Action a été ajouté avec succès.');
          const newActionId = response.id; // ou tout autre nom de propriété qui contient l'identifiant de l'action ajoutée
          console.log('Nouvel ID d\'action : ', newActionId);
          console.log('piece jointe : ', response.piece_jointe);
          this.getActionsByReunion(this.reunionId);
          this.actionForm.reset();
          this.openModaladd();
          this.addModalVisible = false;
        },
        error => console.log(error)
      );
    }
  }
  openModaladd() {
    this.modalRef = this.bsModalService.show(this.addModal);
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }

  getSelectedFileName(): string {
    const fileInput = document.getElementById('customFile') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      return fileInput.files[0].name;
    }
    return 'Choose file';
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
    formData.append('rn', String(this.reunionId));

    this.apiActionsService.updateActionFormdata(this.idAction, formData).subscribe(
      () => {
        console.log('Analyse a été modifiée avec succès.');
        this.getActionsByReunion(this.reunionId);
        this.openModal();
        this.updateModalVisible = false;
      },
      error => console.log(error)
    );
  }






  deleteAction() {
    this.apiActionsService.delAction(this.idToDelete).subscribe(() => {
      this.getActionsByReunion(this.reunionId);
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
