import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { ApexChart, ApexResponsive } from 'ng-apexcharts';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ChartComponent } from 'ng-apexcharts';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';

@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements AfterViewInit {
  @ViewChildren(ChartComponent) charts!: QueryList<ChartComponent>;

  public Actions: ApexChart = {
    type: 'donut',
    width: 380,
  };

  public NC: ApexChart = {
    type: 'bar',
    width: 380,
  };

  public Audits: ApexChart = {
    type: 'donut',
    width: 380,
  };

  public pieSeries: number[] = [];
  public pieLabels: string[] = [];

  public barSeries: number[] = [];
  public barLabels: string[] = [];

  public auditSeries: number[] = [100];
  public auditLabels: string[] = ['Label A'];

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

  constructor(private apiActionsService: ApiActionsService, private ncservice: ServicesNonConfirmitéService) {}

  ngAfterViewInit(): void {
    this.loadChartFromLocalStorage();
    this.fetchChartData();
    this.fetchNCChartData();
  }

  private loadChartFromLocalStorage(): void {
    const storedData = localStorage.getItem('chartData');
    if (storedData) {
      try {
        const { series, labels } = JSON.parse(storedData);
        this.pieSeries = series[0];
        this.pieLabels = labels[0];
        this.barSeries = series[1];
        this.barLabels = labels[1];
        this.refreshCharts();
      } catch (error) {
        console.error('Error parsing stored chart data:', error);
      }
    }
  }

  private storeChartData(): void {
    const chartData = { series: [this.pieSeries, this.barSeries], labels: [this.pieLabels, this.barLabels] };
    localStorage.setItem('chartData', JSON.stringify(chartData));
  }

  fetchChartData(): void {
    this.apiActionsService.getStatsByTypeAction().subscribe((data: any[]) => {
      this.pieSeries = data.map((item) => item.count);
      this.pieLabels = data.map((item) => item.type_action);
      this.storeChartData();
      this.refreshCharts();
    });
  }

  fetchNCChartData(): void {
    this.ncservice.getStatsByNature().subscribe((data: any[]) => {
      console.log('Fetched NC Chart Data:', data);

      this.barSeries = data.map((item) => item.count);
      this.barLabels = data.map((item) => item.nature);
      console.log('Bar Series:', this.barSeries);
      console.log('Bar Labels:', this.barLabels);

      this.storeChartData();
      this.refreshCharts();
    });
  }

  refreshCharts(): void {
    const actionsUpdatedSeries = [{ data: this.pieSeries }];
    const actionsUpdatedLabels = this.pieLabels;
    const actionsOptions = { labels: actionsUpdatedLabels, series: actionsUpdatedSeries };

    const auditUpdatedSeries = [{ data: this.auditSeries }];
    const auditUpdatedLabels = this.auditLabels;
    const auditOptions = { labels: auditUpdatedLabels, series: auditUpdatedSeries };

    const ncUpdatedSeries = [{ data: this.barSeries }];
    const ncUpdatedLabels = this.barLabels;
    const ncOptions = { labels: ncUpdatedLabels, series: ncUpdatedSeries };

    setTimeout(() => {
      this.charts.forEach((chart) => {
        if (chart.chart) {
          const chartType = chart.chart.type;

          if (chartType === 'pie') {
            chart.updateSeries(actionsUpdatedSeries);
            chart.updateOptions(actionsOptions);
          } else if (chartType === 'bar') {
            chart.updateSeries(ncUpdatedSeries);
            chart.updateOptions(ncOptions);
          }
        }
      });
    }, 500);
  }
}
