import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ListCommandesComponent } from './Components/Commandes/list-commandes/list-commandes.component';
import { ListDangerComponent } from './Components/Document-unique/list-danger/list-danger.component';
import { ListNcComponent } from './Components/Non-comfirmite/list-nc/list-nc.component';
import { ListRegistreTraitementComponent } from './Components/RGPD/list-registre-traitement/list-registre-traitement.component';


@NgModule({
  declarations: [
    AppComponent,
    ListCommandesComponent,
    ListDangerComponent,
    ListNcComponent,
    ListRegistreTraitementComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
