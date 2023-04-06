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



const routes: Routes = [

  //path pour les commandes 
  {path : '', component: LoginComponent},
  {path:'home', component :HomeComponent},


  {path : 'danger', component: ListDangerComponent},
  {path : 'addDanger', component: AddDangerComponent},
  {path : 'updateDanger/:id', component: UpdateDangerComponent},
  {path: 'infoDanger/:id', component: InfoDangerComponent},
  {path : 'evenement', component: InfoEvenementComponent},
  { path: 'sidebar', component: SidebarComponent },
  { path: 'list-registre-traitement', component: ListRegistreTraitementComponent },
  {path : 'nc-list', component: ListNcComponent},
  {path : 'nc-add', component: AddNcComponent},

  {path : 'sidebar', component: SidebarComponent},
  {path: 'listC', component: ListCommandesComponent},
  {path: 'addC', component: AddCommandeComponent},
  {path: 'updateC/:id_commande', component: UpdateCommandeComponent },
  {path: 'listF', component: ListFicheComponent},
  {path: 'addF', component: AddFicheComponent},
  {path: 'updateF/:id', component: UpdateFicheComponent },
  {path: 'login', component: LoginComponent},
  {path : 'listP', component: ListPersonnelComponent},
  {path :'addP', component: AddPersonnelComponent},

  {path:'updateP/:id', component :UpdatePersonnelComponent},
  {path:'addPersonnel', component :AddPersonnelComponent},
  {path : 'listProcessus', component:ListProcessusComponent},
  {path: 'addProcessus', component: AddProcessusComponent},
  {path : 'updateProcessus/:id', component: UpdateProcessusComponent}

  {path:'updateP', component :UpdatePersonnelComponent},
  {path:'addPersonnel', component :AddPersonnelComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
