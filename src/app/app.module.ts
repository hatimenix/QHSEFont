import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ListCommandesComponent } from './Components/Commandes/list-commandes/list-commandes.component';
import { ListDangerComponent } from './Components/Document-unique/list-danger/list-danger.component';
import { ListNcComponent } from './Components/Non-comfirmite/list-nc/list-nc.component';
import { ListRegistreTraitementComponent } from './Components/RGPD/list-registre-traitement/list-registre-traitement.component';
import { UpdateCommandeComponent } from './Components/Commandes/update-commande/update-commande.component';
import { AddCommandeComponent } from './Components/Commandes/add-commande/add-commande.component';
import { UpdateFicheComponent } from './Components/ficheTechnique/update-fiche/update-fiche.component';
import { AddFicheComponent } from './Components/ficheTechnique/add-fiche/add-fiche.component';
import { ListFicheComponent } from './Components/ficheTechnique/list-fiche/list-fiche.component';
import { LoginComponent } from './Components/login/login.component';
import { ListPersonnelComponent } from './Components/personnel/list-personnel/list-personnel.component';
import { AddPersonnelComponent } from './Components/personnel/add-personnel/add-personnel.component';
import { UpdatePersonnelComponent } from './Components/personnel/update-personnel/update-personnel.component';
import { HomeComponent } from './Components/home/home.component';
import { ListProcessusComponent } from './Components/Processus/list-processus/list-processus.component';
import { AddProcessusComponent } from './Components/Processus/add-processus/add-processus.component';
import { UpdateProcessusComponent } from './Components/Processus/update-processus/update-processus.component';
import { ListSiteComponent } from './Components/Sites/list-site/list-site.component';
import { AddSiteComponent } from './Components/Sites/add-site/add-site.component';
import { UpdateSiteComponent } from './Components/Sites/update-site/update-site.component';
import { LisSecteurComponent } from './Components/Secteurs/lis-secteur/lis-secteur.component';
import { AddSecteurComponent } from './Components/Secteurs/add-secteur/add-secteur.component';
import { UpdateSecteurComponent } from './Components/Secteurs/update-secteur/update-secteur.component';

import { HttpClientModule } from '@angular/common/http';
import { InfoEvenementComponent } from './Components/Evenement/info-evenement/info-evenement.component';
import { InfoDangerComponent } from './Components/Document-unique/info-danger/info-danger.component';
import { UpdateDangerComponent } from './Components/Document-unique/update-danger/update-danger.component';
import { AddDangerComponent } from './Components/Document-unique/add-danger/add-danger.component';
import { InfoNcComponent } from './Components/Non-comfirmite/info-nc/info-nc.component';
import { AddNcComponent } from './Components/Non-comfirmite/add-nc/add-nc.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InfoActionComponent } from './Components/Actions/info-action/info-action.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ListEquipementsComponent } from './Components/Equipements/list-equipements/list-equipements.component';
import { AddEquipementsComponent } from './Components/Equipements/add-equipements/add-equipements.component';
import { ListDocumentationComponent } from './Components/Documentation/list-documentation/list-documentation.component';
import { AddtDocumentationComponent } from './Components/Documentation/addt-documentation/addt-documentation.component';
import { UpdateDocumentationComponent } from './Components/Documentation/update-documentation/update-documentation.component';
import { DetailsDocsComponent } from './Components/Documentation/details-docs/details-docs.component';
import { AddRegistreTraitementComponent } from './Components/RGPD/add-registre-traitement/add-registre-traitement.component';
import { ListFournisseursComponent } from './Components/Fournisseurs/list-fournisseurs/list-fournisseurs.component';
import { AddFournisseursComponent } from './Components/Fournisseurs/add-fournisseurs/add-fournisseurs.component';
import { EvenementListComponent } from './Components/Evenement/evenement-list/evenement-list.component';
import { DetailspersonnelComponent } from './Components/personnel/detailspersonnel/detailspersonnel/detailspersonnel.component';
import { InfoRGPDComponent } from './Components/RGPD/info-rgpd/info-rgpd.component';
import { AddMenusComponent } from './Components/Menus/addMenus/add-menus/add-menus.component';
import { ListMenusComponent } from './Components/Menus/listMenus/list-menus/list-menus.component';
import { UpdateMenusComponent } from './Components/Menus/updateMenus/update-menus/update-menus.component';
import { DetailsFicheComponent } from './Components/ficheTechnique/detailsFiche/details-fiche/details-fiche.component';
import { ListDocumentsUtilesComponent } from './Components/Documents-utiles/list-documents-utiles/list-documents-utiles.component';
import { AddDocumentsUtilesComponent } from './Components/Documents-utiles/add-documents-utiles/add-documents-utiles.component';
import { AddUsersComponent } from './Components/UserApp/add-users/add-users.component';
import { ListUsersComponent } from './Components/UserApp/list-users/list-users.component';
import { UpdateUsersComponent } from './Components/UserApp/update-users/update-users.component';
import { ListGroupesComponent } from './Components/GroupUsers/list-groupes/list-groupes.component';
import { AdGroupesComponent } from './Components/GroupUsers/ad-groupes/ad-groupes.component';
import { UpdateGroupesComponent } from './Components/GroupUsers/update-groupes/update-groupes.component';
import { ListSanteComponent } from './Components/Sante/list-sante/list-sante.component';
import { AddSanteComponent } from './Components/Sante/add-sante/add-sante.component';
import { ListCatographieComponent } from './Components/Catographie/list-catographie/list-catographie.component';
import { ListQualiteComponent } from './Components/Qualite/list-qualite/list-qualite.component';
import { AddQualiteComponent } from './Components/Qualite/add-qualite/add-qualite.component';
import { InfoQualiteComponent } from './Components/Qualite/info-qualite/info-qualite.component';
import { ProfileComponent } from './Components/UserApp/profile/profile.component';
import { ListPartieComponent } from './Components/Parties-interesses/list-partie/list-partie.component';
import { AddPartieComponent } from './Components/Parties-interesses/add-partie/add-partie.component';
import { InfoPartieComponent } from './Components/Parties-interesses/info-partie/info-partie.component';
import { AddTypepartieComponent } from './Components/TypeParties/add-typepartie/add-typepartie.component';
import { InfoExigencesComponent } from './Components/Exigences/info-exigences/info-exigences.component';
import { InfoAnalyserisqueComponent } from './Components/AnalysesRisques/info-analyserisque/info-analyserisque.component';
import { ListTachesComponent } from './Components/Taches/list-taches/list-taches.component';
import { AddTachesComponent } from './Components/Taches/add-taches/add-taches.component';
import { AddSourceComponent } from './Components/Source/add-source/add-source.component';
import { InfoTachesComponent } from './Components/Taches/info-taches/info-taches.component';
import { ListControlComponent } from './Components/Control/list-control/list-control.component';
import { AddControlComponent } from './Components/Control/add-control/add-control.component';
import { UpdateControlComponent } from './Components/Control/update-control/update-control.component';
import { AddPjComponent } from './Components/PJ/add-pj/add-pj.component';
import { ListPjComponent } from './Components/PJ/list-pj/list-pj.component';
import { UpdatePjComponent } from './Components/PJ/update-pj/update-pj.component';
import { ListRapportAuditComponent } from './Components/RapportAudit/list-rapport-audit/list-rapport-audit.component';
import { AddRapportAuditComponent } from './Components/RapportAudit/add-rapport-audit/add-rapport-audit.component';
import { UpdateRapportAuditComponent } from './Components/RapportAudit/update-rapport-audit/update-rapport-audit.component';
import { ListCertificatComponent } from './Components/Certificat-Calibration/list-certificat/list-certificat.component';
import { AddCertificatComponent } from './Components/Certificat-Calibration/add-certificat/add-certificat.component';
import { UpdateCertificatComponent } from './Components/Certificat-Calibration/update-certificat/update-certificat.component';
import { DetailsProcessusComponent } from './Components/Processus/details-processus/details-processus.component';
import { ListExigencesComponent } from './Components/Exigences/list-exigences/list-exigences.component';
import { AddExigencesComponent } from './Components/Exigences/add-exigences/add-exigences.component';
import { GraphiquesComponent } from './Components/Graphiques/graphiques/graphiques.component';
import { NgApexchartsModule } from 'ng-apexcharts';

import { ListConstatsComponent } from './Components/constatAudit/list-constats/list-constats.component';
import { AddConstatComponent } from './Components/constatAudit/add-constat/add-constat.component';
import { InfoConstatComponent } from './Components/constatAudit/info-constat/info-constat.component';
import { ListAxesComponent } from './Components/AxesStratégiques/list-axes/list-axes.component';
import { AddAxesComponent } from './Components/AxesStratégiques/add-axes/add-axes.component';
import { InfoAxesComponent } from './Components/AxesStratégiques/info-axes/info-axes.component';
import { ListAnalyseSWOTComponent } from './Components/AnalysesRisques/list-analyse-swot/list-analyse-swot.component';
import { CartographieRisquesComponent } from './Components/AnalysesRisques/cartographie-risques/cartographie-risques.component';
import { AddRisquesComponent } from './Components/AnalysesRisques/add-risques/add-risques.component';
import { ListAnalyseRisqueComponent } from './Components/AnalysesRisques/list-analyse-risque/list-analyse-risque.component';
import { AddAnalyseRisqueComponent } from './Components/AnalysesRisques/add-analyse-risque/add-analyse-risque.component';
import { UpdateAnalyseRisqueComponent } from './Components/AnalysesRisques/update-analyse-risque/update-analyse-risque.component';
import { AddPlanAlimentaireComponent } from './Components/PlanAlimentaire/add-plan-alimentaire/add-plan-alimentaire.component';
import { ListePlanAlimentaireComponent } from './Components/PlanAlimentaire/liste-plan-alimentaire/liste-plan-alimentaire.component';
import { AddExerciceComponent } from './Components/ExerciceSecurite/add-exercice/add-exercice.component';
import { ListExerciceComponent } from './Components/ExerciceSecurite/list-exercice/list-exercice.component';
import { ListReunionComponent } from './Components/Reunion/list-reunion/list-reunion.component';
import { AddReunionComponent } from './Components/Reunion/add-reunion/add-reunion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCommandesComponent,
    ListDangerComponent,
    ListNcComponent,
    ListRegistreTraitementComponent,
    SidebarComponent,
    UpdateCommandeComponent,
    AddCommandeComponent,
    UpdateFicheComponent,
    AddFicheComponent,
    ListFicheComponent,
    LoginComponent,
    ListPersonnelComponent,
    AddPersonnelComponent,
    UpdatePersonnelComponent,
    HomeComponent,
    ListProcessusComponent,
    AddProcessusComponent,
    UpdateProcessusComponent,
    ListSiteComponent,
    AddSiteComponent,
    UpdateSiteComponent,
    LisSecteurComponent,
    ListFournisseursComponent,
    UpdateSecteurComponent,
    AddFournisseursComponent,

    AddCommandeComponent,
    InfoEvenementComponent,
    InfoDangerComponent,
    UpdateDangerComponent,
    AddDangerComponent,
    InfoNcComponent,
    AddNcComponent,
    NavbarComponent,
    InfoActionComponent,
    ListEquipementsComponent,
    AddEquipementsComponent,
    ListDocumentationComponent,
    AddtDocumentationComponent,
    UpdateDocumentationComponent,
    DetailsDocsComponent,
    EvenementListComponent,
    DetailspersonnelComponent,
    AddMenusComponent,
    ListMenusComponent,
    UpdateMenusComponent,
    AddRegistreTraitementComponent,
    InfoRGPDComponent,
    DetailsFicheComponent,
    ListDocumentsUtilesComponent,
    AddDocumentsUtilesComponent,
    AddUsersComponent,
    ListUsersComponent,
    UpdateUsersComponent,
    ListGroupesComponent,
    AdGroupesComponent,
    UpdateGroupesComponent,
    ListSanteComponent,
    AddSanteComponent,
    ListCatographieComponent,
    ListQualiteComponent,
    AddQualiteComponent,
    InfoQualiteComponent,
    ProfileComponent,
    ListPartieComponent,
    AddPartieComponent,
    InfoPartieComponent,
    AddTypepartieComponent,
    InfoExigencesComponent,
    InfoAnalyserisqueComponent,
    ListTachesComponent,
    AddTachesComponent,
    AddSourceComponent,
    InfoTachesComponent,
    ListControlComponent,
    AddControlComponent,
    UpdateControlComponent,
    AddPjComponent,
    ListPjComponent,
    UpdatePjComponent,
    ListRapportAuditComponent,
    AddRapportAuditComponent,
    UpdateRapportAuditComponent,
    ListCertificatComponent,
    AddCertificatComponent,
    UpdateCertificatComponent,
    DetailsProcessusComponent,
    ListExigencesComponent,
    AddExigencesComponent,
    GraphiquesComponent,
    ListConstatsComponent,
    AddConstatComponent,
    InfoConstatComponent,
    ListAxesComponent,
    AddAxesComponent,
    InfoAxesComponent,
    ListAnalyseSWOTComponent,
    CartographieRisquesComponent,
    AddRisquesComponent,
    ListAnalyseRisqueComponent,
    AddAnalyseRisqueComponent,
    UpdateAnalyseRisqueComponent,
    AddPlanAlimentaireComponent,
    ListePlanAlimentaireComponent,
    AddExerciceComponent,
    ListExerciceComponent,
    ListReunionComponent,
    AddReunionComponent

  ],
  imports: [
    ModalModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgApexchartsModule


  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }