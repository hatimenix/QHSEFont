import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDangerComponent } from './Components/Document-unique/list-danger/list-danger.component';
import { AddDangerComponent } from './Components/Document-unique/add-danger/add-danger.component';
import { UpdateDangerComponent } from './Components/Document-unique/update-danger/update-danger.component';

const routes: Routes = [
  {path : 'danger', component: ListDangerComponent},
  {path : 'addDanger', component: AddDangerComponent},
  {path : 'updateDanger/:id', component: UpdateDangerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
