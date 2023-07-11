import { Component } from '@angular/core';
import { AnalyseRisquesService } from 'src/app/Services/Service-analyseRisques/analyse-risques.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { AnalyseRisques } from 'src/app/models/analyse-risques';
import { Processus } from 'src/app/models/pocesus';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-list-analyse-swot',
  templateUrl: './list-analyse-swot.component.html',
  styleUrls: ['./list-analyse-swot.component.css']
})
export class ListAnalyseSWOTComponent {
  risques: AnalyseRisques[] = [];
  sites: Site[] = []; 
  processusList: Processus[] = []; 
  selectedSite: any = '';
  selectedProcessus: any = '';


  constructor(
    private risqueservice: AnalyseRisquesService,
    private apiSiteService: ApiSiteService,
    private apiProcessusService: ProcessusService
  ) {}

  ngOnInit(): void {
    this.getRisques();
    this.getSites();
    this.getProcessusList();
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

  getSites() {
    this.apiSiteService.getAllSite().subscribe(
      (data: Site[]) => {
        this.sites = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getProcessusList() {
    this.apiProcessusService.getProcessus().subscribe(
      (data: Processus[]) => {
        this.processusList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  toNumber(value: string): number {
    return parseFloat(value);
  }

  filterRisques() {
    let selectedSiteId = parseInt(this.selectedSite);
    let selectedProcessusId = parseInt(this.selectedProcessus);
  
    if (selectedSiteId || selectedProcessusId) {
      this.risqueservice.getAllAnalyseRisques().subscribe(
        res => {
          let filteredRisques: AnalyseRisques[] = res;
  
          if (selectedSiteId && selectedProcessusId) {
            filteredRisques = res.filter(risque => {
              return (
                risque.site === selectedSiteId &&
                risque.processus.includes(selectedProcessusId)
              );
            });
          } else if (selectedSiteId) {
            filteredRisques = res.filter(risque => {
              return risque.site === selectedSiteId;
            });
          } else if (selectedProcessusId) {
            filteredRisques = res.filter(risque => {
              return risque.processus.includes(selectedProcessusId);
            });
          }
  
          this.risques = filteredRisques;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.getRisques();
    }
  }
  resetSite() {
    this.selectedSite = null;
    this.filterRisques();
  }
  
  resetProcessus() {
    this.selectedProcessus = null;
    this.filterRisques();
  }
  
}
