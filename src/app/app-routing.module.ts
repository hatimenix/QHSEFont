import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ListNcComponent } from './Components/Non-comfirmite/list-nc/list-nc.component';
import { AddNcComponent } from './Components/Non-comfirmite/add-nc/add-nc.component';

const routes: Routes = [
  {path : 'sidebar', component: SidebarComponent},
  {path : 'nc-list', component: ListNcComponent},
  {path : 'nc-add', component: AddNcComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
