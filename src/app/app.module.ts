import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ListCommandesComponent } from './Components/Commandes/list-commandes/list-commandes.component';
import { ListDangerComponent } from './Components/Document-unique/list-danger/list-danger.component';
import { ListNcComponent } from './Components/Non-comfirmite/list-nc/list-nc.component';
import { ListRegistreTraitementComponent } from './Components/RGPD/list-registre-traitement/list-registre-traitement.component';
import { UpdateCommandeComponent } from './Components/Commandes/update-commande/update-commande.component';
import { AddCommandeComponent } from './Components/Commandes/add-commande/add-commande.component';
import { UpdateFicheComponent } from './Components/ficheTechnique/update-fiche/update-fiche.component';
import { AddFicheComponent } from './Components/ficheTechnique/add-fiche/add-fiche.component';
import { ListFicheComponent } from './Components/ficheTechnique/list-fiche/list-fiche.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDangerComponent } from './Components/Document-unique/add-danger/add-danger.component';
import { UpdateDangerComponent } from './Components/Document-unique/update-danger/update-danger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNcComponent } from './Components/Non-comfirmite/add-nc/add-nc.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { InfoEvenementComponent } from './Components/Evenement/info-evenement/info-evenement.component';
import { InfoDangerComponent } from './Components/Document-unique/info-danger/info-danger.component';




@NgModule({
  declarations: [
    AppComponent,
    ListCommandesComponent,
    ListDangerComponent,
    ListNcComponent,
    ListRegistreTraitementComponent,
    SidebarComponent,
    UpdateCommandeComponent, 
    AddCommandeComponent,
    UpdateFicheComponent,
    AddFicheComponent,
    ListFicheComponent,
    AddCommandeComponent,
    AddDangerComponent,
    UpdateDangerComponent,
    InfoEvenementComponent,
    InfoDangerComponent,
    UpdateDangerComponent,
    AddNcComponent,

  ],
  imports: [
    
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxPaginationModule,
    Ng2SearchPipeModule

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
