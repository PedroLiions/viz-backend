import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';

declare var $: any;

/* set am4charts animations */
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-best-time',
  templateUrl: './best-time.component.html',
  styleUrls: ['./best-time.component.scss']
})
export class BestTimeComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;
  private indicatorsByHour = {};

  public data: any;

  public distribuitionByHour: Array<object>;

  constructor(
    private zone: NgZone,
    private dashboardsService: DashboardsService,
    private cdRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.distribuitionByHour = [
      {
        hour: 'TOTAL',
        'Best time': 0,
        'Attempts': '501,233',
        'Answered': '14.803',
        '%Hit/Rate': '3.0%',
        '%CPC': '22.3%',
        '%CPCA': '100%',
        'Deals': '100.0%',
        '%Deals': '60.3%'
      },
      {
        hour: '00h',
        'Best time': 4,
        'Attempts': '16,881',
        'Answered': 477,
        '%Hit/Rate': '2.8%',
        '%CPC': '19.5%',
        '%CPCA': '100.0%',
        'Deals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '01h',
        'Best time': 4,
        'Attempts': '16,881',
        'Answered': 477,
        '%Hit/Rate': '2.8%',
        '%CPC': '19.5%',
        '%CPCA': '100.0%',
        'Deals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '02h',
        'Best time': 4,
        'Attempts': '16,881',
        'Answered': 477,
        '%Hit/Rate': '2.8%',
        '%CPC': '19.5%',
        '%CPCA': '100.0%',
        'Deals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '03h',
        'Best time': 4,
        'Attempts': '16,881',
        'Answered': 477,
        '%Hit/Rate': '2.8%',
        '%CPC': '19.5%',
        '%CPCA': '100.0%',
        'Deals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '04h',
        'Best time': 4,
        'Attempts': '16,881',
        'Answered': 477,
        '%Hit/Rate': '2.8%',
        '%CPC': '19.5%',
        '%CPCA': '100.0%',
        'Deals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '05h',
        'Best time': 4,
        'Attempts': '16,881',
        'Answered': 477,
        '%Hit/Rate': '2.8%',
        '%CPC': '19.5%',
        '%CPCA': '100.0%',
        'Deals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '06h',
        'Best time': 4,
        'Attempts': '16,881',
        'Answered': 477,
        '%Hit/Rate': '2.8%',
        '%CPC': '19.5%',
        '%CPCA': '100.0%',
        'Deals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '07h',
        'Best time': 4,
        'Attempts': '16,881',
        'Answered': 477,
        '%Hit/Rate': '2.8%',
        '%CPC': '19.5%',
        '%CPCA': '100.0%',
        'Deals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '08h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '09h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '10h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '11h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '12h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '13h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '14h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '15h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '16h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '17h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '18h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '19h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '20h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '21h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '22h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
      {
        hour: '23h',
        'Best time': 3,
        'Attempts': '55,629',
        'Answered': '067',
        '%Hit/Rate': '3.7%',
        '%CPC': '24.1%',
        '%CPCA': '100.0%',
        'DealsDeals': 226,
        '%Deals': '60.3%'
      },
    ];
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.dashboardsService.bestTime().subscribe(response => {
        this.data = response.data;
        /* create charts */
        this.dispachCharts();
        /* update view */
        this.cdRef.detectChanges();
        /* mount table */
        this.dispachDataTable();
      });
    });
  }

  dispachCharts(): void {
    this.mountDistributionByHour('attempts-by-hour', this.data.attemptsByHour, '#E61857');
    this.mountDistributionByHour('answered-by-hour', this.data.answeredByHour, '#B49065');
    this.mountDistributionByHour('cpc-by-hour', this.data.cpcByHour, '#17BABF');
    this.mountDistributionByHour('cpca-by-hour', this.data.cpcaByHour, '#34C15C');
    this.mountDistributionByHour('deals-by-hour', this.data.dealsByHour, '#41719C');
    this.mountDistributionByHour('improductive-by-hour', this.data.improductiveByHour, '#F5781B');
    this.mountDistributionByHour('incorrect-by-hour', this.data.incorrectByHour, '#F0749A');
    this.mountDistributionByHour('tma-by-hour', this.data.tmaByHour, '#46B6FE');
  }

  public mountDistributionByHour(objName: string, data, color): void {
    this.indicatorsByHour[objName] = am4core.create(objName, am4charts.XYChart);
    this.indicatorsByHour[objName].paddingRight = 0;
    this.indicatorsByHour[objName].paddingLeft = 0;
    this.indicatorsByHour[objName].paddingTop = 0;
    this.indicatorsByHour[objName].paddingBottom = 0;

    const categoryAxis = this.indicatorsByHour[objName].yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'hour';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 25;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    categoryAxis.renderer.labels.template.adapter.add('text', text => text + 'h');

    const valueAxis = this.indicatorsByHour[objName].xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.extraMax = 0.9;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    const columnSeries = this.indicatorsByHour[objName].series.push(new am4charts.ColumnSeries());
    columnSeries.dataFields.categoryY = 'hour';
    columnSeries.dataFields.valueX = 'value';
    columnSeries.fill = am4core.color(color, 0.1);
    columnSeries.columns.template.stroke = am4core.color(color);
    columnSeries.columns.template.strokeWidth = 1;
    columnSeries.columns.template.strokeOpacity = 1;
    columnSeries.columns.template.width = am4core.percent(50);

    const labelBullet = columnSeries.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = 'left';
    labelBullet.label.dx = 5;
    labelBullet.label.maxWidth = 100;
    labelBullet.label.truncate = false;
    labelBullet.label.text = '{values.valueX.workingValue.formatNumber("#.0as")}';
    labelBullet.label.fill = am4core.color('#B9B9B9');

    this.indicatorsByHour[objName].data = data;
  }

  dispachDataTable(): void {
    const bootstrapTableConfig = {
      exportTypesx: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
      pagination: true,
      showColumns: true,
      pageList: [10, 25, 100, 200],
      showExport: true,
      showToggle: true,
      sortStable: true,

      showFullscreen: true,
      showPrint: true,

      dataField: 'items',
      totalField: 'count',
      sorting: true,

      search: true,
      dataToggle: false,
      cache: false,

      sortable: true,
    };

    const $table = $('[rel="distributionByHour"]');

    $table.bootstrapTable(bootstrapTableConfig);
    $table.bootstrapTable('hideLoading');
  }

  ngOnDestroy(): void {
  }


}
