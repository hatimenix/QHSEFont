import { AfterViewInit, Component, QueryList, ViewChild } from '@angular/core';
import { ApexChart, ApexResponsive } from 'ng-apexcharts';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ChartComponent } from 'ng-apexcharts';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { ConstatAuditService } from 'src/app/Services/Service-constatAudit/constat-audit.service';

@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements AfterViewInit {
  filteredData: any[] = [];
  data: any[] = [];
  filteredChartData: any[] = [];
  selectedSite: string = 'All';
  sites: string[] = [];
  selectedActionYear: string = 'All';
  actionYears: string[] = [];
  ncdata: any[] = [];
  filteredNCChartData: any[] = [];  
  selectedNCYear: string = 'All';
  ncYears: string[] = [];
  @ViewChild('actionsChart') actionsChart!: ChartComponent;
  @ViewChild('ncChart') ncChart!: ChartComponent;
  @ViewChild('auditChart') auditChart!: ChartComponent;
  @ViewChild('datencChart') datencChart!: ChartComponent;
  public Actions: ApexChart = {
    type: 'pie',
    width: 390,
  };

  public NC: ApexChart = {
    type: 'bar',
    width: 370,
  };

  public Audit: ApexChart = {
    type: 'donut', 
    width: 420,
  };

  public datenc: ApexChart = {
    type: 'bar',
    width: 430,
  };
  

  public pieSeries: number[] = [];
  public pieLabels: string[] = [];

  public barSeries: number[] = [];
  public barLabels: string[] = [];

  public thirdChartSeries: number[] = [];
  public thirdChartLabels: string[] = [];
  
  public datencSeries: number[] = [];
  public datencLabels: string[] = [];

  public responsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ];

  constructor(
    private apiActionsService: ApiActionsService,
    private ncservice: ServicesNonConfirmitéService,
    private thirdChartService: ConstatAuditService
  ) {}
  ngAfterViewInit(): void {
    this.fetchChartData();
    this.fetchNCChartData();
    this.fetchThirdChartData();
    this.fetchDateNCChartData();
  }

   storeChartData(): void {
    const chartData = {
      series: [this.pieSeries, this.barSeries, this.thirdChartSeries, this.datencSeries],
      labels: [this.pieLabels, this.barLabels, this.thirdChartLabels, this.datencLabels],
    };
    localStorage.setItem('chartData', JSON.stringify(chartData));
  }
  
   fetchChartData(): void {
    this.apiActionsService.getStatsByTypeAction().subscribe((data: any[]) => {
      this.data = data;
      this.filteredChartData = data;
      this.sites = Array.from(new Set(data.map(item => item.site__site_nom)));
      this.actionYears = Array.from(new Set(data.map(item => item.year)));
        this.updateChartData();
    });
  }
   updateChartData(): void {
    this.filteredChartData = this.data.filter(item => 
      (this.selectedSite === 'All' || item.site__site_nom === this.selectedSite) &&
      (this.selectedActionYear === 'All' || item.year === this.selectedActionYear)
    );
    this.pieSeries = this.filteredChartData.map(item => item.count);
    this.pieLabels = this.filteredChartData.map(item => item.type_action);

    this.refreshCharts();
  }
  

  
  onSiteChange(): void {
  this.updateChartData();
  }
  
  onActionYearChange(): void {
  this.updateChartData();
  }
  
  onNCYearChange(): void {
    if (this.selectedNCYear === 'All') {
      this.filteredNCChartData = this.ncdata;
      this.barSeries = this.filteredNCChartData.map(item => item.count);
      this.barLabels = this.filteredNCChartData.map(item => item.nature);
      this.refreshCharts();
    } else {
      this.fetchNCChartData();
    }
  }
  
  fetchNCChartData(): void {
    this.ncservice.getStatsByNature().subscribe((data: any[]) => {
      this.ncdata = data;
      this.filteredNCChartData = (this.selectedNCYear === 'All')
        ? this.ncdata
        : this.ncdata.filter(item => item.year === this.selectedNCYear);
      this.barSeries = this.filteredNCChartData.map(item => item.count);
      this.barLabels = this.filteredNCChartData.map(item => item.nature);
      this.ncYears = Array.from(new Set(this.ncdata.map(item => item.year)));
      this.storeChartData();
      this.refreshCharts();
    });
  }
  
  fetchThirdChartData(): void {
    this.thirdChartService.getStatsByIntituleConstat().subscribe((data: any[]) => {
      this.thirdChartSeries = data.map(item => item.count);
      this.thirdChartLabels = data.map(item => item.intitule_constat);
      this.storeChartData();
      this.refreshCharts();
    });
  }
  
  refreshCharts(): void {
    setTimeout(() => {
      if (this.actionsChart) {
        this.actionsChart.updateOptions({ labels: this.pieLabels });
        this.actionsChart.updateSeries(this.filteredChartData.map(item => item.count));
      }
      if (this.ncChart) {
        this.ncChart.updateOptions({ xaxis: { categories: this.barLabels } });
        this.ncChart.updateSeries([{ data: this.barSeries }]);
      }
      if (this.auditChart) {
        this.auditChart.updateOptions({ labels: this.thirdChartLabels });
        this.auditChart.updateSeries(this.thirdChartSeries);
      }
      if (this.datencChart) {
        this.datencChart.updateOptions({ xaxis: { categories: this.datencLabels } });
        this.datencChart.updateSeries([{ data: this.datencSeries }]);
      }
    }, 500);
  }
  
  getTotalActions(): number {
    return this.pieSeries?.reduce((total, value) => total + value, 0) || 0;
  }
  
  getTotalNc(): number {
    return this.barSeries?.reduce((total, value) => total + value, 0) || 0;
  }
  
  getTotalAudit(): number {
    return this.thirdChartSeries?.reduce((total, value) => total + value, 0) || 0;
  }
  fetchDateNCChartData(): void {
    this.ncservice.getStatsDelaiPrevuVsDateNc().subscribe((data: any[]) => {
      this.datencSeries = data.map(item => item.year);
      this.datencLabels = data.map(item => item.delai_days);
    });
    
  }
  
}
