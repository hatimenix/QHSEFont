import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';

@Component({
  selector: 'app-details-processus',
  templateUrl: './details-processus.component.html',
  styleUrls: ['./details-processus.component.css']
})
export class DetailsProcessusComponent {
  id!: number;
  currentId:any

  constructor(private processusService: ProcessusService, 
    private route: ActivatedRoute,
      )    {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.processusService.getProcessusById(this.id).subscribe(proc => {
          this.currentId = proc;
        });
      }
    });
   
  }



}
