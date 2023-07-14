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
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  forcesPagination!: {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    p: number;
  };
  faiblessesPagination!: {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    p: number;
  };
  opportunitesPagination!: {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    p: number;
  };
  menacesPagination = {
    itemsPerPageOptions: this.itemsPerPageOptions,
    itemsPerPage: this.itemsPerPageOptions[0],
    p: 1
  };
  
  risques: AnalyseRisques[] = [];
  sites: Site[] = []; 
  processusList: Processus[] = []; 
  selectedSite: any = '';
  selectedProcessus: any = '';
  get totalForcesPages(): number {
    return Math.ceil(this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue >= 0 && maitriseValue <= 0.4;
    }).length / this.forcesPagination.itemsPerPage);
  }
  
  get displayedForcesRisques(): AnalyseRisques[] {
    const startIndex = (this.forcesPagination.p - 1) * this.forcesPagination.itemsPerPage;
    const endIndex = startIndex + this.forcesPagination.itemsPerPage;
    return this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue >= 0 && maitriseValue <= 0.4;
    }).slice(startIndex, endIndex);
  }
  get totalFaiblessesPages(): number {
    return Math.ceil(this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue > 0.7 && maitriseValue <= 0.9;
    }).length / this.faiblessesPagination.itemsPerPage);
  }
  
  get displayedFaiblessesRisques(): AnalyseRisques[] {
    const startIndex = (this.faiblessesPagination.p - 1) * this.faiblessesPagination.itemsPerPage;
    const endIndex = startIndex + this.faiblessesPagination.itemsPerPage;
    return this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue > 0.7 && maitriseValue <= 0.9;
    }).slice(startIndex, endIndex);
  }
  get totalOpportunitesPages(): number {
    return Math.ceil(this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue > 0.4 && maitriseValue <= 0.7;
    }).length / this.opportunitesPagination.itemsPerPage);
  }
  
  get displayedOpportunitesRisques(): AnalyseRisques[] {
    const startIndex = (this.opportunitesPagination.p - 1) * this.opportunitesPagination.itemsPerPage;
    const endIndex = startIndex + this.opportunitesPagination.itemsPerPage;
    return this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue > 0.4 && maitriseValue <= 0.7;
    }).slice(startIndex, endIndex);
  }
  get totalMenacesPages(): number {
    return Math.ceil(this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue >= 1;
    }).length / this.menacesPagination.itemsPerPage);
  }
  
  get displayedMenacesRisques(): AnalyseRisques[] {
    const startIndex = (this.menacesPagination.p - 1) * this.menacesPagination.itemsPerPage;
    const endIndex = startIndex + this.menacesPagination.itemsPerPage;
    return this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue >= 1;
    }).slice(startIndex, endIndex);
  }

  constructor(
    private risqueservice: AnalyseRisquesService,
    private apiSiteService: ApiSiteService,
    private apiProcessusService: ProcessusService
  ) {}

  ngOnInit(): void {
    this.getRisques();
    this.getSites();
    this.getProcessusList();
    this.forcesPagination = {
      itemsPerPageOptions: this.itemsPerPageOptions,
      itemsPerPage: this.itemsPerPageOptions[0],
      p: 1
    };
    this.faiblessesPagination = {
      itemsPerPageOptions: this.itemsPerPageOptions,
      itemsPerPage: this.itemsPerPageOptions[0],
      p: 1
    };
    this.opportunitesPagination = {
      itemsPerPageOptions: this.itemsPerPageOptions,
      itemsPerPage: this.itemsPerPageOptions[0],
      p: 1
    };
    this.menacesPagination = {
      itemsPerPageOptions: this.itemsPerPageOptions,
      itemsPerPage: this.itemsPerPageOptions[0],
      p: 1
    };
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
    this.selectedSite = '';
    this.filterRisques();
  }
  
  resetProcessus() {
    this.selectedProcessus = '';
    this.filterRisques();
  }
  onForcesItemsPerPageChange(option: number) {
    this.forcesPagination.p = 1;
    this.forcesPagination.itemsPerPage = option;
  }
  
  getPageNumbersForForces(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalForcesPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  
  getDisplayedRangeForForces(): string {
    const filteredRisques = this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue >= 0 && maitriseValue <= 0.4;
    });
  
    const startIndex = (this.forcesPagination.p - 1) * this.forcesPagination.itemsPerPage + 1;
    const endIndex = Math.min(this.forcesPagination.p * this.forcesPagination.itemsPerPage, filteredRisques.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${filteredRisques.length} entrées`;
  }
  onFaiblessesItemsPerPageChange(option: number) {
    this.faiblessesPagination.p = 1;
    this.faiblessesPagination.itemsPerPage = option;
  }
  
  getPageNumbersForFaiblesses(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalFaiblessesPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  
  getDisplayedRangeForFaiblesses(): string {
    const filteredRisques = this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue > 0.7 && maitriseValue <= 0.9;
    });
  
    const startIndex = (this.faiblessesPagination.p - 1) * this.faiblessesPagination.itemsPerPage + 1;
    const endIndex = Math.min(this.faiblessesPagination.p * this.faiblessesPagination.itemsPerPage, filteredRisques.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${filteredRisques.length} entrées`;
  }
  onOpportunitesItemsPerPageChange(option: number) {
    this.opportunitesPagination.p = 1;
    this.opportunitesPagination.itemsPerPage = option;
  }
  
  getPageNumbersForOpportunites(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalOpportunitesPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  
  getDisplayedRangeForOpportunites(): string {
    const filteredRisques = this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue > 0.4 && maitriseValue <= 0.7;
    });
  
    const startIndex = (this.opportunitesPagination.p - 1) * this.opportunitesPagination.itemsPerPage + 1;
    const endIndex = Math.min(this.opportunitesPagination.p * this.opportunitesPagination.itemsPerPage, filteredRisques.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${filteredRisques.length} entrées`;
  }
  onMenacesItemsPerPageChange(option: number) {
    this.menacesPagination.p = 1;
    this.menacesPagination.itemsPerPage = option;
  }
  
  getPageNumbersForMenaces(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalMenacesPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  
  getDisplayedRangeForMenaces(): string {
    const filteredRisques = this.risques.filter(risque => {
      const maitriseValue = parseFloat(risque.maitrise);
      return maitriseValue >= 1;
    });
  
    const startIndex = (this.menacesPagination.p - 1) * this.menacesPagination.itemsPerPage + 1;
    const endIndex = Math.min(this.menacesPagination.p * this.menacesPagination.itemsPerPage, filteredRisques.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${filteredRisques.length} entrées`;
  }
  
}
