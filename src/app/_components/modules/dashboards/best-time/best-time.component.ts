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

  constructor(
    private zone: NgZone,
    private dashboardsService: DashboardsService,
    private cdRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.dashboardsService.bestTime().subscribe(response => {
        this.data = response.data;
        /* create charts */
        this.dispachCharts();
        /* update view */
        this.cdRef.detectChanges();
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

  ngOnDestroy(): void {
  }


}
