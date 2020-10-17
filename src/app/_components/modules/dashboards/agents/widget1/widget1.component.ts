import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {DashboardsService} from '../../../../../_services/http/dashboards/dashboards.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

declare var $: any;

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-widget1',
  templateUrl: './widget1.component.html',
  styleUrls: ['./widget1.component.scss']
})
export class Widget1Component implements OnInit, AfterViewInit {

  private chart: am4charts.XYChart;

  public data: any;

  details = {};

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
      this.dashboardsService.agents().subscribe(response => {
        this.data = response.data;
        /* create charts */
        this.dispachCharts();
        /* update view */
        this.cdRef.detectChanges();
      });
    });
  }

  dispachCharts(): void {
    this.mountEvolution('details-cpc', 'detailsCPC', '#17BABF', 'Answered', 'CPC');
  }

  /* chart functions */
  public mountEvolution(objName, dataKey, color, nameX, nameY): void {
    this.details[objName] = am4core.create(objName, am4charts.XYChart);
    this.details[objName].paddingRight = 15;
    this.details[objName].paddingLeft = 0;
    this.details[objName].paddingTop = 15;
    this.details[objName].paddingBottom = 0;

    const valueAxisX = this.details[objName].xAxes.push(new am4charts.ValueAxis());
    // valueAxisX.title.text = app.$t(nameX);
    valueAxisX.title.fill = am4core.color('#B9B9B9');
    valueAxisX.renderer.ticks.template.disabled = true;
    valueAxisX.renderer.axisFills.template.disabled = true;
    valueAxisX.renderer.labels.template.fill = am4core.color('#B9B9B9');
    valueAxisX.renderer.grid.template.strokeOpacity = 0.3;
    valueAxisX.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const valueAxisY = this.details[objName].yAxes.push(new am4charts.ValueAxis());
    // valueAxisY.title.text = app.$t(nameY);
    valueAxisY.title.fill = am4core.color('#B9B9B9');
    valueAxisY.renderer.ticks.template.disabled = true;
    valueAxisY.renderer.axisFills.template.disabled = true;
    valueAxisY.renderer.labels.template.fill = am4core.color('#B9B9B9');
    valueAxisY.renderer.grid.template.strokeOpacity = 0.3;
    valueAxisY.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const series = this.details[objName].series.push(new am4charts.LineSeries());
    series.dataFields.valueX = 'x';
    series.dataFields.valueY = 'y';
    series.dataFields.value = 'value';
    series.strokeOpacity = 0;
    series.sequencedInterpolation = true;

    const bullet = series.bullets.push(new am4core.Circle());
    bullet.fill = am4core.color(color);
    //bullet.propertyFields.fill = 'color';
    bullet.strokeOpacity = 0;
    bullet.strokeWidth = 2;
    bullet.fillOpacity = 0.5;
    bullet.stroke = am4core.color('#ffffff');
    bullet.hiddenState.properties.opacity = 0;
    bullet.tooltipText = '[bold]{company}: {value.value}';

    const outline = this.details[objName].plotContainer.createChild(am4core.Circle);
    outline.fillOpacity = 0;
    outline.strokeOpacity = 0.8;
    outline.stroke = am4core.color(color, 0.5);
    outline.strokeWidth = 2;
    outline.hide(0);

    const blurFilter = new am4core.BlurFilter();
    outline.filters.push(blurFilter);

    bullet.events.on('over', (event) => {
      const target = event.target;
      outline.radius = target.pixelRadius + 2;
      outline.x = target.pixelX;
      outline.y = target.pixelY;
      outline.show();
    });

    bullet.events.on('out', event => {
      outline.hide();
    });

    const hoverState = bullet.states.create('hover');
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.strokeOpacity = 1;

    series.heatRules.push({target: bullet, min: 2, max: 60, property: 'radius'});

    bullet.adapter.add('tooltipY', (tooltipY, target) => {
      return -target.radius;
    });

    this.details[objName].cursor = new am4charts.XYCursor();
    this.details[objName].cursor.behavior = 'zoomXY';
    this.details[objName].cursor.snapToSeries = series;
    this.details[objName].cursor.lineX.stroke = am4core.color('#8c8c8c');
    this.details[objName].cursor.lineX.strokeWidth = 2;
    this.details[objName].cursor.lineY.stroke = am4core.color('#8c8c8c');
    this.details[objName].cursor.lineY.strokeWidth = 2;

    this.details[objName].data = this.data[dataKey];
  }

}
