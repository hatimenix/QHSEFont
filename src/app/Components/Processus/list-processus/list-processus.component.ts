import { Component, OnInit } from '@angular/core';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';

import { Personnel } from 'src/app/models/Personnel';

import { Processus } from 'src/app/models/pocesus';


@Component({
  selector: 'app-list-processus',
  templateUrl: './list-processus.component.html',
  styleUrls: ['./list-processus.component.css']
})
export class ListProcessusComponent implements OnInit {
  
  processus: Processus[] = [];
  personnelService: any;
  
constructor(private processusService: ProcessusService) { }
ngOnInit(): void {
this.loadprocessus();
}
loadprocessus() {
this.processusService.getProcessus().subscribe(
(data: Processus[]) => {
this.processus = data;
}
)
}
deleteProcessus(id: number) :void{
  this.processusService.deleteProcessus(id).subscribe(() => {
    this.processus = this.processus.filter((p) => p.id !== id);
  });
}
}
