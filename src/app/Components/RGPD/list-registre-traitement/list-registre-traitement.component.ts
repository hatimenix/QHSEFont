import { Component } from '@angular/core';
import { ServiceRegistreTraitementService } from 'src/app/Services/Service-registre-traitement/service-registre-traitement.service';
@Component({
  selector: 'app-list-registre-traitement',
  templateUrl: './list-registre-traitement.component.html',
  styleUrls: ['./list-registre-traitement.component.css']
})
export class ListRegistreTraitementComponent {
  constructor(private service:ServiceRegistreTraitementService){ }
  TraitementList:any=[];
  ngOnInit(): void{
   this.refreshtraitementlist();
  }
  refreshtraitementlist(){
    this.service.gettraitementlist().subscribe(data=>{
      this.TraitementList=data;
    })
  }

}