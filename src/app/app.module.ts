import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ListCommandesComponent } from './Components/Commandes/list-commandes/list-commandes.component';
import { ListDangerComponent } from './Components/Document-unique/list-danger/list-danger.component';
import { ListNcComponent } from './Components/Non-comfirmite/list-nc/list-nc.component';
import { ListRegistreTraitementComponent } from './Components/RGPD/list-registre-traitement/list-registre-traitement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddNcComponent } from './Components/Non-comfirmite/add-nc/add-nc.component';
import { UpdateDangerComponent } from './Components/Document-unique/update-danger/update-danger.component';
import { AddDangerComponent } from './Components/Document-unique/add-danger/add-danger.component';
import { InfoNcComponent } from './Components/Non-comfirmite/info-nc/info-nc.component';


@NgModule({
  declarations: [
    AppComponent,
    ListCommandesComponent,
    ListDangerComponent,
    ListNcComponent,
    ListRegistreTraitementComponent,
    SidebarComponent,
    AddNcComponent,
    UpdateDangerComponent,
    AddDangerComponent,
    InfoNcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
