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
import { UpdateCommandeComponent } from './Components/Commandes/update-commande/update-commande.component';
import { AddCommandeComponent } from './Components/Commandes/add-commande/add-commande.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDangerComponent } from './Components/Document-unique/add-danger/add-danger.component';
import { UpdateDangerComponent } from './Components/Document-unique/update-danger/update-danger.component';




@NgModule({
  declarations: [
    AppComponent,
    ListCommandesComponent,
    ListDangerComponent,
    ListNcComponent,
    ListRegistreTraitementComponent,
    SidebarComponent,
    UpdateCommandeComponent, 
    AddCommandeComponent
    AddDangerComponent,
    UpdateDangerComponent

  ],
  imports: [
    
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
