import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
@Component({
  selector: 'app-list-analyse-swot',
  templateUrl: './list-analyse-swot.component.html',
  styleUrls: ['./list-analyse-swot.component.css']
})
export class ListAnalyseSWOTComponent {
  risques : AnalyseRisques[] = []
  constructor(private   risqueservice : AnalyseRisquesService, private router : Router){

  }
  ngOnInit(): void {
    this.getRisques();

  }
  getRisques() {
    this.risqueservice.getAllAnalyseRisques().subscribe(
      res => {
        this.risques = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  
toNumber(value: string): number {
  return parseFloat(value);
}



}
