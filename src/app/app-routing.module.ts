import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ListCommandesComponent } from './Components/Commandes/list-commandes/list-commandes.component';
import { AddCommandeComponent } from './Components/Commandes/add-commande/add-commande.component';
import { UpdateCommandeComponent } from './Components/Commandes/update-commande/update-commande.component';

const routes: Routes = [
  //path pour les commandes 
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
