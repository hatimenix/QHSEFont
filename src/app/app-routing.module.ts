import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRegistreTraitementComponent } from './Components/RGPD/list-registre-traitement/list-registre-traitement.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';


const routes: Routes = [
  { path: 'sidebar', component: SidebarComponent },
  { path: 'list-registre-traitement', component: ListRegistreTraitementComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
