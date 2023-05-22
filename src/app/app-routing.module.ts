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





const routes: Routes = [
  {path : '', component: LoginComponent },
  {path : 'login', component: LoginComponent },
  {path: 'home', component :HomeComponent, canActivate: [AuthGuardService] },
  {path : 'danger', component: ListDangerComponent},
  {path : 'addDanger', component: AddDangerComponent},
  {path : 'updateDanger/:id', component: UpdateDangerComponent},
  {path : 'infoDanger/:id', component: InfoDangerComponent},
  {path : 'infoAction/:id', component: InfoActionComponent},
  {path : 'info_evenement/:id', component: InfoEvenementComponent},
  {path : 'evenement-list', component: EvenementListComponent},
  {path: 'list-registre-traitement', component: ListRegistreTraitementComponent},
  {path : 'nc-list', component: ListNcComponent},
  {path : 'nc-add', component: AddNcComponent},
  {path: 'listC', component: ListCommandesComponent},
  {path: 'addC', component: AddCommandeComponent},
  {path: 'updateC/:id_commande', component: UpdateCommandeComponent },
  {path: 'listF', component: ListFicheComponent},
  {path: 'addF', component: AddFicheComponent},
  {path: 'updateF/:id', component: UpdateFicheComponent },
  {path: 'detailsFiche/:id', component: DetailsFicheComponent},
  {path : 'listP', component: ListPersonnelComponent},
  {path :'addP', component: AddPersonnelComponent},
  {path:'updateP/:id', component :UpdatePersonnelComponent},
  {path:'addPersonnel', component :AddPersonnelComponent},
  {path : 'listProcessus', component:ListProcessusComponent},
  {path: 'addProcessus', component: AddProcessusComponent},
  {path : 'updateProcessus/:id', component: UpdateProcessusComponent},
  {path :'listsites', component: ListSiteComponent},
  {path:'addSite', component:AddSiteComponent},
  {path: 'updateSite/:id', component: UpdateSiteComponent},
  {path: 'listSecteur', component:LisSecteurComponent},
  {path:'addSecteur', component:AddSecteurComponent},
  {path:'updateSecteur/:id', component:UpdateSecteurComponent},
  { path: 'nc/:id', component: InfoNcComponent },
  //documentation
  {path : 'listdocument', component:ListDocumentationComponent},
  {path : 'add-document', component:AddtDocumentationComponent},
  {path : 'updateDocument/:id', component: UpdateDocumentationComponent},
  {path : 'detailDocs/:id', component: DetailsDocsComponent},

  {path : 'equipement-list', component: ListEquipementsComponent},
  {path : 'add-equipements', component: AddEquipementsComponent},
  {path : 'add-RGPD', component: AddRegistreTraitementComponent},
  {path : 'fournisseur-list', component: ListFournisseursComponent},
  {path : 'add-fournisseurs', component: AddFournisseursComponent},
  { path: 'traitement/:id', component: InfoRGPDComponent },


//Menus paths
  {path : 'detailpersonn/:id', component: DetailspersonnelComponent},
  {path: 'addMenu', component: AddMenusComponent}, 
  {path: 'listMenu', component: ListMenusComponent}, 
  {path: 'updateMenu/:id', component: UpdateMenusComponent}, 
  {path : 'documents-utiles-list', component: ListDocumentsUtilesComponent},
  {path : 'add-Documentutile', component:  AddDocumentsUtilesComponent},

  //Users, groupes and rôles

  {path : 'listuserapp',component:ListUsersComponent },
  {path : 'adduserapp',component:AddUsersComponent },
  {path : 'updateuserapp/:id',component:UpdateUsersComponent },

  {path:'listgroupeusers', component:ListGroupesComponent},
  {path:'addgroupeusers', component:AdGroupesComponent},
  {path:'updategroupeusers/:id', component:UpdateGroupesComponent},
  {path : 'sante-list', component: ListSanteComponent},
  {path : 'add-sante', component: AddSanteComponent},
  {path : 'cartographie', component: ListCatographieComponent},
  {path : 'qualite-list', component: ListQualiteComponent},
  {path : 'add-qualite', component: AddQualiteComponent},
  { path: 'qualite/:id', component: InfoQualiteComponent },









  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
