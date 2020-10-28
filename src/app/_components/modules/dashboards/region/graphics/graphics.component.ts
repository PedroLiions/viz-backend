import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardsService} from '../../../../../_services/http/dashboards/dashboards.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_brazilLow from '@amcharts/amcharts4-geodata/brazilLow';


@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit, OnDestroy {

  data: any;

  distributionByState: any;
  perfilMobileFixed: any;
  bestCPCFixedMobile: any;
  totalTriggers: any;

  constructor(
    private dashboardsService: DashboardsService
  ) {
  }

  ngOnInit(): void {
    this.dashboardsService.region().subscribe(response => {
      this.data = response;

      this.mountDistributionByState();

      this.mountPerfilMobileFixed();

      this.mountBestCPCFixedMobile();

      this.mountTotalTriggers();
    });
  }

  mountDistributionByState(): void {
    this.distributionByState = am4core.create('quality-by-state', am4charts.XYChart);
    this.distributionByState.paddingRight = -12;
    this.distributionByState.paddingLeft = 0;
    this.distributionByState.paddingTop = 10;
    this.distributionByState.paddingBottom = 0;

    const categoryAxis = this.distributionByState.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'state';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 25;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    categoryAxis.renderer.grid.template.strokeOpacity = 0.3;
    categoryAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');
//        categoryAxis.renderer.labels.template.rotation = -45;
//        categoryAxis.renderer.labels.template.horizontalCenter = 'right';
//        categoryAxis.renderer.labels.template.verticalCenter = 'middle';

    const valueAxis = this.distributionByState.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    valueAxis.renderer.grid.template.strokeOpacity = 0.3;
    valueAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const gradient = new am4core.LinearGradient();
    gradient.rotation = 90;
    gradient.addColor(am4core.color('#E61857', 0.1));

    const series = this.distributionByState.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'total';
    series.dataFields.categoryX = 'state';
    series.tooltipText = '[{categoryX}: bold]{valueY}[/]';
    series.tooltip.pointerOrientation = 'vertical';

    series.columns.template.strokeWidth = 1;
    series.columns.template.column.fill = gradient;
    series.columns.template.stroke = am4core.color('#E61857');

    const hoverState = series.columns.template.column.states.create('hover');
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add('fill', (fill, target) => this.distributionByState.colors.getIndex(target.dataItem.index));

    const paretoValueAxis = this.distributionByState.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = '#\'%\'';
    paretoValueAxis.cursorTooltipEnabled = false;
    paretoValueAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');

    const paretoSeries = this.distributionByState.series.push(new am4charts.LineSeries());
    paretoSeries.dataFields.valueY = 'percent';
    paretoSeries.dataFields.categoryX = 'state';
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = '{valueY.formatNumber(\'#.0\')}%[/]';
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeOpacity = 0.5;
    paretoSeries.stroke = am4core.color('#41719C');
    paretoSeries.strokeWidth = 3;

    this.distributionByState.cursor = new am4charts.XYCursor();
    this.distributionByState.cursor.behavior = 'panX';

    this.distributionByState.data = this.data['data']['distributionByState'];
  }

  mountPerfilMobileFixed(): void {
    this.perfilMobileFixed = am4core.create('perfil-mobile-fixed', am4charts.XYChart);
    this.perfilMobileFixed.paddingRight = 0;
    this.perfilMobileFixed.paddingLeft = 0;
    this.perfilMobileFixed.paddingTop = 10;
    this.perfilMobileFixed.paddingBottom = 0;

    const categoryAxis = this.perfilMobileFixed.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'step';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    categoryAxis.renderer.labels.template.rotation = -45;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.dx = 15;
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.grid.template.strokeOpacity = 0.3;
    categoryAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const valueAxis = this.perfilMobileFixed.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    valueAxis.renderer.grid.template.strokeOpacity = 0.3;
    valueAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const gradient = new am4core.LinearGradient();
    gradient.rotation = 90;
    gradient.addColor(am4core.color('#E61857', 0.1));

    const series = this.perfilMobileFixed.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'percent';
    series.dataFields.categoryX = 'step';

    series.columns.template.strokeWidth = 1;
    series.columns.template.column.fill = gradient;
    series.columns.template.stroke = am4core.color('#E61857');
    series.columns.template.tooltipText = '{valueY.value}';

    this.perfilMobileFixed.data = this.data.data.perfilMobileFixed;
  }

  mountBestCPCFixedMobile(): void {
    this.bestCPCFixedMobile = am4core.create('best-cpc-fixed-mobile', am4charts.XYChart);
    this.bestCPCFixedMobile.paddingRight = 0;
    this.bestCPCFixedMobile.paddingLeft = 0;
    this.bestCPCFixedMobile.paddingTop = 10;
    this.bestCPCFixedMobile.paddingBottom = 0;

    const categoryAxis = this.bestCPCFixedMobile.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'step';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    categoryAxis.renderer.labels.template.rotation = -45;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.dx = 15;
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.grid.template.strokeOpacity = 0.3;
    categoryAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const valueAxis = this.bestCPCFixedMobile.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.labels.template.fill = am4core.color('#B9B9B9');
    valueAxis.renderer.grid.template.strokeOpacity = 0.3;
    valueAxis.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const gradient = new am4core.LinearGradient();
    gradient.rotation = 90;
    gradient.addColor(am4core.color('#17BABF', 0.1));

    const series = this.bestCPCFixedMobile.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'percent';
    series.dataFields.categoryX = 'step';

    series.columns.template.strokeWidth = 1;
    series.columns.template.column.fill = gradient;
    series.columns.template.stroke = am4core.color('#17BABF');
    series.columns.template.tooltipText = '{valueY.value}';

    this.bestCPCFixedMobile.data = this.data.data.bestCPCFixedMobile;
  }

  mountTotalTriggers(): void {
    this.totalTriggers = am4core.create('total-triggers', am4maps.MapChart);
    this.totalTriggers.maxZoomLevel = 64;
    this.totalTriggers.geodata = am4geodata_brazilLow;
    this.totalTriggers.projection = new am4maps.projections.Miller();

    const polygonSeries = this.totalTriggers.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = am4core.color('#505050', 0.2);

    const circleSeries = this.totalTriggers.series.push(new am4maps.MapPolygonSeries());
    const circleTemplate = circleSeries.mapPolygons.template;
    circleTemplate.fill = am4core.color('#17BABF', 0.5);
    circleTemplate.strokeOpacity = 0;
    circleTemplate.fillOpacity = 0.75;

    const data = this.data.data.totalTriggers;

    for (let i = 0; i < data.length; i++) {
      const polygon = circleSeries.mapPolygons.create();
      polygon.multiPolygon = am4maps.getCircle(data[i].longitude, data[i].latitude, Math.max(0.2, Math.log(data[i].total) * Math.LN10 / 10));
    }
  }


  ngOnDestroy(): void {
    try {
      this.totalTriggers.dispose();
    } catch (e) {
    }
    try {
      this.bestCPCFixedMobile.dispose();
    } catch (e) {
    }
    try {
      this.perfilMobileFixed.dispose();
    } catch (e) {
    }
    try {
      this.distributionByState.dispose();
    } catch (e) {
    }
  }

}
