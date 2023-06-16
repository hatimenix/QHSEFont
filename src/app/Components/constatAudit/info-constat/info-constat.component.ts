import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
import { Site } from 'src/app/models/site';
import { Utilsateur } from 'src/app/models/utilsateur';
declare var window: any;
@Component({
  selector: 'app-info-constat',
  templateUrl: './info-constat.component.html',
  styleUrls: ['./info-constat.component.css']
})
export class InfoConstatComponent {
  constatId !: number;
  constat!: ConstatAudit;
  utilisateurs: any[] = [];
  selectedUtilisateur: Utilsateur | undefined

  responsable_traitement: number[] = []

  sites: any[] = [];
  selectedSite: Site | undefined;

  modalRef!: BsModalRef;
  @ViewChild('utilisateurModal', { static: true }) utilisateurModal: any;
  @ViewChild('siteModal', { static: true }) siteModal: any;


  idAction !: number;
  action !: Actions;

  actions$!: Observable<Actions[]>;


  ncForm!: FormGroup;




  // intitule_constat: any
  // type_constat: any
  // audit_associe: any
  // site: any
  // responsable_traitement: number[] = []
  // processus: any
  // date_reponse: any
  // localisation: any
  // type_audit: any
  // rapport_audit: any
  // description_constat: any


  constructor(
    private route: ActivatedRoute,
    private caservice: ConstatAuditService,

    private utilisateurservice: ApiUtilisateurService,
    private bsModalService: BsModalService,
    private apiSiteService: ApiSiteService,
    private apiActionsService: ApiActionsService,
    private apiRealisationService: ApiRealisationService,
  ) { }
  ngOnInit() {
    this.constatId = +this.route.snapshot.params['id'];
    // this.caservice.getConstatAuditById(this.constatId).subscribe(
    //   (data: ConstatAudit) => {
    //     this.constat = data;
    //     this.ncForm.patchValue({
    //       intitule: this.nc.intitule,
    //       nature: this.nc.nature,
    //       domaine: this.nc.domaine,
    //       date_nc: this.nc.date_nc,
    //       processus_name: this.nc.processus_name,
    //       site_name: this.nc.site_name,
    //       date_prise_en_compte: this.nc.date_prise_en_compte,
    //       annee: this.nc.annee,
    //       mois: this.nc.mois,
    //       detail_cause: this.nc.detail_cause,
    //       delai_prevu: this.nc.delai_prevu,
    //       type_cause: this.nc.type_cause,
    //       cout: this.nc.cout,
    //       progress: this.nc.progress,
    //       info_complementaires: this.nc.info_complementaires,
    //       piece_jointe: this.nc.piece_jointe,
    //       frequence: this.nc.frequence,
    //       gravite: this.nc.gravite,
    //       action_immediate: this.nc.action_immediate,
    //       nc_cloture: this.nc.nc_cloture,
    //       responsable_name: this.nc.responsable_name

    //     });
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
      map((actions: Actions[]) => actions.filter(action => action.nc.includes(constatId))),
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

}
