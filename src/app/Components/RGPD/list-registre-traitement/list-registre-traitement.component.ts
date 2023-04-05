import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceRegistreTraitementService } from 'src/app/Services/Service-registre-traitement/service-registre-traitement.service';
@Component({
  selector: 'app-list-registre-traitement',
  templateUrl: './list-registre-traitement.component.html',
  styleUrls: ['./list-registre-traitement.component.css']
})
export class ListRegistreTraitementComponent {
  constructor(private service:ServiceRegistreTraitementService,private router: Router){ }
  TraitementList:any=[];
  ngOnInit(): void{
   this.refreshtraitementlist();
  }
  refreshtraitementlist(){
    this.service.gettraitementlist().subscribe(data=>{
      this.TraitementList=data;
    })
  }
  navigateToAddRegistreTraitement() {
    this.router.navigate(['/Add-Registre-Traitement']);
    
  }

}
