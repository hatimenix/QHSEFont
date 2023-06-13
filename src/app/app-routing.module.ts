import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDangerComponent } from './Components/Document-unique/list-danger/list-danger.component';
import { AddDangerComponent } from './Components/Document-unique/add-danger/add-danger.component';
import { UpdateDangerComponent } from './Components/Document-unique/update-danger/update-danger.component';

import { InfoEvenementComponent } from './Components/Evenement/info-evenement/info-evenement.component';
import { InfoDangerComponent } from './Components/Document-unique/info-danger/info-danger.component';

import { ListRegistreTraitementComponent } from './Components/RGPD/list-registre-traitement/list-registre-traitement.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ListNcComponent } from './Components/Non-comfirmite/list-nc/list-nc.component';
import { AddNcComponent } from './Components/Non-comfirmite/add-nc/add-nc.component';


import { ListCommandesComponent } from './Components/Commandes/list-commandes/list-commandes.component';
import { AddCommandeComponent } from './Components/Commandes/add-commande/add-commande.component';
import { UpdateCommandeComponent } from './Components/Commandes/update-commande/update-commande.component';
import { ListFicheComponent } from './Components/ficheTechnique/list-fiche/list-fiche.component';
import { AddFicheComponent } from './Components/ficheTechnique/add-fiche/add-fiche.component';
import { UpdateFicheComponent } from './Components/ficheTechnique/update-fiche/update-fiche.component';
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
import { InfoActionComponent } from './Components/Actions/info-action/info-action.component';
import { InfoNcComponent } from './Components/Non-comfirmite/info-nc/info-nc.component';

import { ListDocumentationComponent } from './Components/Documentation/list-documentation/list-documentation.component';
import { AddtDocumentationComponent } from './Components/Documentation/addt-documentation/addt-documentation.component';
import { UpdateDocumentationComponent } from './Components/Documentation/update-documentation/update-documentation.component';

import { ListEquipementsComponent } from './Components/Equipements/list-equipements/list-equipements.component';
import { AddEquipementsComponent } from './Components/Equipements/add-equipements/add-equipements.component';
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
import { ListUsersComponent } from './Components/UserApp/list-users/list-users.component';
import { AddUsersComponent } from './Components/UserApp/add-users/add-users.component';
import { UpdateUsersComponent } from './Components/UserApp/update-users/update-users.component';
import { ListGroupesComponent } from './Components/GroupUsers/list-groupes/list-groupes.component';
import { AdGroupesComponent } from './Components/GroupUsers/ad-groupes/ad-groupes.component';
import { UpdateGroupesComponent } from './Components/GroupUsers/update-groupes/update-groupes.component';

import { AuthGuardService } from './Services/Service-authentification/auth-guard.service';

import { ListSanteComponent } from './Components/Sante/list-sante/list-sante.component';
import { AddSanteComponent } from './Components/Sante/add-sante/add-sante.component';
import { ListCatographieComponent } from './Components/Catographie/list-catographie/list-catographie.component';
import { ListQualiteComponent } from './Components/Qualite/list-qualite/list-qualite.component';
import { AddQualiteComponent } from './Components/Qualite/add-qualite/add-qualite.component';
import { InfoQualiteComponent } from './Components/Qualite/info-qualite/info-qualite.component';
import { ListPartieComponent } from './Components/Parties-interesses/list-partie/list-partie.component';
import { AddPartieComponent } from './Components/Parties-interesses/add-partie/add-partie.component';
import { AddTypepartieComponent } from './Components/TypeParties/add-typepartie/add-typepartie.component';
import { InfoPartieComponent } from './Components/Parties-interesses/info-partie/info-partie.component';
import { InfoExigencesComponent } from './Components/Exigences/info-exigences/info-exigences.component';
import { InfoAnalyserisqueComponent } from './Components/AnalysesRisques/info-analyserisque/info-analyserisque.component';
import { ListTachesComponent } from './Components/Taches/list-taches/list-taches.component';
import { AddTachesComponent } from './Components/Taches/add-taches/add-taches.component';
import { AddSourceComponent } from './Components/Source/add-source/add-source.component';
import { InfoTachesComponent } from './Components/Taches/info-taches/info-taches.component';
import { ListControlComponent } from './Components/Control/list-control/list-control.component';
import { AddControlComponent } from './Components/Control/add-control/add-control.component';
import { UpdateControlComponent } from './Components/Control/update-control/update-control.component';
import { ListPjComponent } from './Components/PJ/list-pj/list-pj.component';
import { AddPjComponent } from './Components/PJ/add-pj/add-pj.component';
import { UpdatePjComponent } from './Components/PJ/update-pj/update-pj.component';





const routes: Routes = [
  {path : '', component: LoginComponent },
  {path : 'login', component: LoginComponent },
  {path: 'home', component :HomeComponent, canActivate: [AuthGuardService] },
  {path : 'danger', component: ListDangerComponent, canActivate: [AuthGuardService]},
  {path : 'addDanger', component: AddDangerComponent, canActivate: [AuthGuardService]},
  {path : 'updateDanger/:id', component: UpdateDangerComponent, canActivate: [AuthGuardService]},
  {path : 'infoDanger/:id', component: InfoDangerComponent, canActivate: [AuthGuardService]},
  {path : 'infoAction/:id', component: InfoActionComponent, canActivate: [AuthGuardService]},
  {path : 'info_evenement/:id', component: InfoEvenementComponent, canActivate: [AuthGuardService]},
  {path : 'evenement-list', component: EvenementListComponent, canActivate: [AuthGuardService]},
  {path: 'list-registre-traitement', component: ListRegistreTraitementComponent, canActivate: [AuthGuardService]},
  {path : 'nc-list', component: ListNcComponent, canActivate: [AuthGuardService]},
  {path : 'nc-add', component: AddNcComponent, canActivate: [AuthGuardService]},
  {path: 'listC', component: ListCommandesComponent, canActivate: [AuthGuardService]},
  {path: 'addC', component: AddCommandeComponent, canActivate: [AuthGuardService]},
  {path: 'updateC/:id_commande', component: UpdateCommandeComponent , canActivate: [AuthGuardService]},
  {path: 'listF', component: ListFicheComponent, canActivate: [AuthGuardService]},
  {path: 'addF', component: AddFicheComponent, canActivate: [AuthGuardService]},
  {path: 'updateF/:id', component: UpdateFicheComponent, canActivate: [AuthGuardService] },
  {path: 'detailsFiche/:id', component: DetailsFicheComponent, canActivate: [AuthGuardService]},
  {path : 'listP', component: ListPersonnelComponent, canActivate: [AuthGuardService]},
  {path :'addP', component: AddPersonnelComponent, canActivate: [AuthGuardService]},
  {path:'updateP/:id', component :UpdatePersonnelComponent, canActivate: [AuthGuardService]},
  {path:'addPersonnel', component :AddPersonnelComponent, canActivate: [AuthGuardService]},
  {path : 'listProcessus', component:ListProcessusComponent, canActivate: [AuthGuardService]},
  {path: 'addProcessus', component: AddProcessusComponent, canActivate: [AuthGuardService]},
  {path : 'updateProcessus/:id', component: UpdateProcessusComponent, canActivate: [AuthGuardService]},
  {path :'listsites', component: ListSiteComponent, canActivate: [AuthGuardService]},
  {path:'addSite', component:AddSiteComponent, canActivate: [AuthGuardService]},
  {path: 'updateSite/:id', component: UpdateSiteComponent, canActivate: [AuthGuardService]},
  {path: 'listSecteur', component:LisSecteurComponent, canActivate: [AuthGuardService]},
  {path:'addSecteur', component:AddSecteurComponent, canActivate: [AuthGuardService]},
  {path:'updateSecteur/:id', component:UpdateSecteurComponent, canActivate: [AuthGuardService]},
  { path: 'nc/:id', component: InfoNcComponent , canActivate: [AuthGuardService]},
  //documentation
  {path : 'listdocument', component:ListDocumentationComponent, canActivate: [AuthGuardService]},
  {path : 'add-document', component:AddtDocumentationComponent , canActivate: [AuthGuardService]},
  {path : 'updateDocument/:id', component: UpdateDocumentationComponent, canActivate: [AuthGuardService]},
  {path : 'detailDocs/:id', component: DetailsDocsComponent, canActivate: [AuthGuardService]},

  {path : 'equipement-list', component: ListEquipementsComponent, canActivate: [AuthGuardService]},
  {path : 'add-equipements', component: AddEquipementsComponent, canActivate: [AuthGuardService]},
  {path : 'add-RGPD', component: AddRegistreTraitementComponent, canActivate: [AuthGuardService]},
  {path : 'fournisseur-list', component: ListFournisseursComponent, canActivate: [AuthGuardService]},
  {path : 'add-fournisseurs', component: AddFournisseursComponent, canActivate: [AuthGuardService]},
  { path: 'traitement/:id', component: InfoRGPDComponent, canActivate: [AuthGuardService] },


//Menus paths
  {path : 'detailpersonn/:id', component: DetailspersonnelComponent, canActivate: [AuthGuardService]},
  {path: 'addMenu', component: AddMenusComponent, canActivate: [AuthGuardService]}, 
  {path: 'listMenu', component: ListMenusComponent, canActivate: [AuthGuardService]}, 
  {path: 'updateMenu/:id', component: UpdateMenusComponent, canActivate: [AuthGuardService]}, 
  {path : 'documents-utiles-list', component: ListDocumentsUtilesComponent, canActivate: [AuthGuardService]},
  {path : 'add-Documentutile', component:  AddDocumentsUtilesComponent, canActivate: [AuthGuardService]},

  //Users, groupes and rôles

  {path : 'listuserapp',component:ListUsersComponent , canActivate: [AuthGuardService]},
  {path : 'adduserapp',component:AddUsersComponent, canActivate: [AuthGuardService] },
  {path : 'updateuserapp/:id',component:UpdateUsersComponent, canActivate: [AuthGuardService] },

  {path:'listgroupeusers', component:ListGroupesComponent,canActivate: [AuthGuardService]},
  {path:'addgroupeusers', component:AdGroupesComponent,canActivate: [AuthGuardService]},
  {path:'updategroupeusers/:id', component:UpdateGroupesComponent,canActivate: [AuthGuardService]},
  {path : 'sante-list', component: ListSanteComponent,canActivate: [AuthGuardService]},
  {path : 'add-sante', component: AddSanteComponent,canActivate: [AuthGuardService]},
  {path : 'cartographie', component: ListCatographieComponent,canActivate: [AuthGuardService]},
  {path : 'qualite-list', component: ListQualiteComponent,canActivate: [AuthGuardService]},
  {path : 'add-qualite', component: AddQualiteComponent,canActivate: [AuthGuardService]},
  { path: 'qualite/:id', component: InfoQualiteComponent ,canActivate: [AuthGuardService]},
  {path : 'partie-list', component: ListPartieComponent, canActivate: [AuthGuardService]},
  {path : 'add-parties', component: AddPartieComponent, canActivate: [AuthGuardService]},
  {path : 'add-typeparties', component: AddTypepartieComponent, canActivate: [AuthGuardService]},
  { path: 'partie/:id', component: InfoPartieComponent ,canActivate: [AuthGuardService]},
  { path: 'exigence/:id', component: InfoExigencesComponent ,canActivate: [AuthGuardService]},
  { path: 'analyserisque/:id', component: InfoAnalyserisqueComponent ,canActivate: [AuthGuardService]},
  {path : 'tache-list', component: ListTachesComponent,canActivate: [AuthGuardService]},
  {path : 'add-tache', component: AddTachesComponent,canActivate: [AuthGuardService]},
  {path : 'add-sources', component: AddSourceComponent, canActivate: [AuthGuardService]},
  { path: 'tache/:id', component: InfoTachesComponent ,canActivate: [AuthGuardService]},

  //suivie des contrôles réglementaires 
  {path: 'listcontrol', component: ListControlComponent, canActivate: [AuthGuardService]},
  {path: 'addcontrol', component: AddControlComponent, canActivate: [AuthGuardService]},
  {path: 'updatecontrol/:id', component: UpdateControlComponent, canActivate: [AuthGuardService]},  
  //récents
  {path: 'listpj', component: ListPjComponent, canActivate: [AuthGuardService]},
  {path: 'addPj', component: AddPjComponent, canActivate: [AuthGuardService]},
  {path: 'updatePj/:id', component: UpdatePjComponent, canActivate: [AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
