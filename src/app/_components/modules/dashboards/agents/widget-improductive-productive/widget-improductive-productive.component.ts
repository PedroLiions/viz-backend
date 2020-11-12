import {Component, OnDestroy, OnInit} from '@angular/core';


import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {DashboardsService} from '../../../../../_services/http/dashboards/dashboards.service';

declare var $: any;

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-widget-improductive-productive',
  templateUrl: './widget-improductive-productive.component.html',
  styleUrls: ['./widget-improductive-productive.component.scss']
})
export class WidgetImproductiveProductiveComponent implements OnInit, OnDestroy {

  ranking = {};

  data = [];

  constructor(
    private dashboardsService: DashboardsService
  ) {
  }

  ngOnInit(): void {
    $(() => {
      this.dashboardsService.agents().subscribe(response => {
        this.data = response.data;

        this.mountRanking('summary-improductive', 'improductiveSummary', '#F5781B');
        this.mountRanking('summary-productive', 'productiveSummary', '#17BABF');
      });
    });
  }

  public mountRanking(objName, dataKey, color): void {
    this.ranking[objName] = am4core.create(objName, am4charts.XYChart);
    this.ranking[objName].paddingRight = 15;
    this.ranking[objName].paddingLeft = 0;
    this.ranking[objName].paddingTop = 15;
    this.ranking[objName].paddingBottom = 0;

    const categoryAxis = this.ranking[objName].yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'agent';
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');

    var valueAxis = this.ranking[objName].xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    valueAxis.extraMax = 0.9;

    var columnSeries = this.ranking[objName].series.push(new am4charts.ColumnSeries());
    columnSeries.dataFields.categoryY = 'agent';
    columnSeries.dataFields.valueX = 'percent';
    columnSeries.fill = am4core.color(color, 0.1);
    columnSeries.columns.template.stroke = am4core.color(color);
    columnSeries.columns.template.strokeWidth = 1;
    columnSeries.columns.template.strokeOpacity = 1;
    columnSeries.columns.template.width = am4core.percent(50);

    this.ranking[objName].data = this.data[dataKey];
  }

  ngOnDestroy(): void {
    for (const [key, value] of Object.entries(this.ranking)) {
      this.ranking[key].dispose();
    }
  }

}
