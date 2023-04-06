import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
