import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardsService} from '../../../../../_services/http/dashboards/dashboards.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-line-mini',
  templateUrl: './line-mini.component.html',
  styleUrls: ['./line-mini.component.scss']
})
export class LineMiniComponent implements OnInit, OnDestroy {

  data: any;

  lineMini = {};
  ranges = {};

  constructor(
    private dashboardsService: DashboardsService
  ) {
  }

  ngOnInit(): void {
    this.dashboardsService.portfolio().subscribe(response => {

      this.data = response;

      this.mountLineMini('mini-attempts', 'date', 'total', 'miniAttempts', '#E61857');
      this.mountLineMini('mini-mobile', 'date', 'total', 'miniMobile', '#9988FF');
      this.mountLineMini('mini-cpc', 'date', 'total', 'miniCPC', '#17BABF');
      this.mountLineMini('mini-deals', 'date', 'total', 'miniDeals', '#41719C');
      this.mountLineMini('mini-hit-rate', 'date', 'total', 'miniHitRate', '#BF9000');
      this.mountLineMini('mini-not-found', 'date', 'total', 'miniNotFound', '#4526FE');
      this.mountLineMini('mini-improductive', 'date', 'total', 'miniImproductive', '#C35809');
      this.mountLineMini('mini-logged', 'date', 'total', 'miniLogged', '#8C8C8C');

      this.mountRange('delay-range', 'range', 'amount', 'delayRange');
      this.mountRange('age-range', 'range', 'amount', 'ageRange');
      this.mountRange('civil-status', 'status', 'amount', 'civilStatus');
      this.mountRange('genre', 'genre', 'amount', 'genre');

    });
  }

  mountLineMini(objName, category, value, dataKey, color): void {
    this.lineMini[objName] = am4core.create(objName, am4charts.XYChart);
    this.lineMini[objName].paddingRight = 0;
    this.lineMini[objName].paddingLeft = 0;
    this.lineMini[objName].paddingTop = 5;
    this.lineMini[objName].paddingBottom = 0;

    const dateAxis = this.lineMini[objName].xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.labels.template.disabled = true;
    dateAxis.renderer.grid.template.strokeOpacity = 0.3;
    dateAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const valueAxis = this.lineMini[objName].yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.grid.template.strokeOpacity = 0.3;
    valueAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const series = this.lineMini[objName].series.push(new am4charts.LineSeries());
    series.dataFields.valueY = value;
    series.dataFields.dateX = category;
    series.tooltipText = '{value}';
    series.strokeWidth = 1;
    series.minBulletDistance = 15;
    series.stroke = am4core.color(color);

    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.label.textAlign = 'middle';
    series.tooltip.label.textValign = 'middle';

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 3;
    bullet.circle.fill = am4core.color(color);

    const bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;

    this.lineMini[objName].cursor = new am4charts.XYCursor();
    this.lineMini[objName].cursor.behavior = 'panXY';
    this.lineMini[objName].cursor.xAxis = dateAxis;
    this.lineMini[objName].cursor.snapToSeries = series;

    this.lineMini[objName].data = this.data.data[dataKey];
  }

  mountRange(objName, category, value, dataKey) {
    this.ranges[objName] = am4core.create(objName, am4charts.XYChart);
    this.ranges[objName].paddingRight = 0;
    this.ranges[objName].paddingLeft = 0;
    this.ranges[objName].paddingTop = 10;
    this.ranges[objName].paddingBottom = -10;

    const categoryAxis = this.ranges[objName].xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = category;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.grid.template.strokeOpacity = 0.3;
    categoryAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');
    categoryAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    categoryAxis.renderer.labels.template.rotation = -45;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.labels.template.text = '{category}55';

    const valueAxis = this.ranges[objName].yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.grid.template.strokeOpacity = 0.3;
    valueAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');
    valueAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');

    const gradient = new am4core.LinearGradient();
    gradient.rotation = 90;
    gradient.addColor(am4core.color('#E61857', 0.1));

    const series = this.ranges[objName].series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = value;
    series.dataFields.categoryX = category;

    series.columns.template.strokeWidth = 1;
    series.columns.template.column.fill = gradient;
    series.columns.template.stroke = am4core.color('#E61857');
    series.columns.template.tooltipText = '{valueY.value}';

    this.ranges[objName].data = this.data.data[dataKey];
  }

  ngOnDestroy(): void {
    for (const [key, value] of Object.entries(this.lineMini)) {
      try {
        this.lineMini[key].dispose();
      } catch (e) {
      }
    }

    for (const [key, value] of Object.entries(this.ranges)) {
      try {
        this.ranges[key].dispose();
      } catch (e) {

      }
    }
  }


}
