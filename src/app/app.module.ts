import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCommandesComponent } from './components/Commandes/list-commandes/list-commandes.component';
import { ListDangerComponent } from './components/Document-unique/list-danger/list-danger.component';
import { ListNcComponent } from './components/Non-comfirmite/list-nc/list-nc.component';
import { ListRegistreTraitementComponent } from './components/RGPD/list-registre-traitement/list-registre-traitement.component';
import { SidebarComponent } from './sidebar/sidebar.component';


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
