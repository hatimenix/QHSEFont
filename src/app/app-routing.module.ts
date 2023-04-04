import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDangerComponent } from './Components/Document-unique/list-danger/list-danger.component';
import { AddDangerComponent } from './Components/Document-unique/add-danger/add-danger.component';
import { UpdateDangerComponent } from './Components/Document-unique/update-danger/update-danger.component';
import { ListRegistreTraitementComponent } from './Components/RGPD/list-registre-traitement/list-registre-traitement.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ListNcComponent } from './Components/Non-comfirmite/list-nc/list-nc.component';
import { AddNcComponent } from './Components/Non-comfirmite/add-nc/add-nc.component';
import { ListCommandesComponent } from './Components/Commandes/list-commandes/list-commandes.component';
import { AddCommandeComponent } from './Components/Commandes/add-commande/add-commande.component';
import { UpdateCommandeComponent } from './Components/Commandes/update-commande/update-commande.component';


const routes: Routes = [
  {path : 'danger', component: ListDangerComponent},
  {path : 'addDanger', component: AddDangerComponent},
  {path : 'updateDanger/:id', component: UpdateDangerComponent},
  { path: 'sidebar', component: SidebarComponent },
  { path: 'list-registre-traitement', component: ListRegistreTraitementComponent },
  {path : 'nc-list', component: ListNcComponent},
  {path : 'nc-add', component: AddNcComponent},
  {path : 'sidebar', component: SidebarComponent},
  {path: 'listC', component: ListCommandesComponent},
  {path: 'addC', component: AddCommandeComponent},
  {path: 'updateC/:id_commande', component: UpdateCommandeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
