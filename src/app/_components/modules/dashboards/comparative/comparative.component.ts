import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';
import {Subscription} from 'rxjs';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-comparative',
  templateUrl: './comparative.component.html',
  styleUrls: ['./comparative.component.scss']
})
export class ComparativeComponent implements OnInit, OnDestroy {

  public data: any;

  resumeByCompany: Array<object> = [];

  public subscriptions: Array<Subscription> = [];

  constructor(
    private dashboardsService: DashboardsService
  ) {
  }

  ngOnInit(): void {
    const subs = this.dashboardsService.comparative()
      .subscribe(response => {
        this.data = response;
      });

    this.subscriptions.push(subs);

    this.graphEvolution();
  }

  public graphEvolution(): void {
    const graphEvolution = am4core.create('data-evolution', am4charts.XYChart);
    graphEvolution.paddingRight = 15;
    graphEvolution.paddingLeft = 0;
    graphEvolution.paddingTop = 10;
    graphEvolution.paddingBottom = 0;

    const valueAxisX = graphEvolution.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.title.text = 'CPC';
    valueAxisX.title.fill = am4core.color('#B9B9B9');
    valueAxisX.renderer.ticks.template.disabled = true;
    valueAxisX.renderer.axisFills.template.disabled = true;
    valueAxisX.renderer.labels.template.fill = am4core.color('#B9B9B9');
    valueAxisX.renderer.grid.template.strokeOpacity = 0.3;
    valueAxisX.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const valueAxisY = graphEvolution.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = 'Deals';
    valueAxisY.title.fill = am4core.color('#B9B9B9');
    valueAxisY.renderer.ticks.template.disabled = true;
    valueAxisY.renderer.axisFills.template.disabled = true;
    valueAxisY.renderer.labels.template.fill = am4core.color('#B9B9B9');
    valueAxisY.renderer.grid.template.strokeOpacity = 0.3;
    valueAxisY.renderer.grid.template.stroke = am4core.color('#B9B9B9');

    const series = graphEvolution.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = 'x';
    series.dataFields.valueY = 'y';
    series.dataFields.value = 'value';
    series.strokeOpacity = 0;
    series.sequencedInterpolation = true;

    const bullet = series.bullets.push(new am4core.Circle());
    bullet.fill = am4core.color('#41719C');
    //bullet.propertyFields.fill = 'color';
    bullet.strokeOpacity = 0;
    bullet.strokeWidth = 2;
    bullet.fillOpacity = 0.5;
    bullet.stroke = am4core.color('#B9B9B9');
    bullet.hiddenState.properties.opacity = 0;
    bullet.tooltipText = '[bold]{company}: {value.value}';

    const outline = graphEvolution.plotContainer.createChild(am4core.Circle);
    outline.fillOpacity = 0;
    outline.strokeOpacity = 0.8;
    outline.stroke = am4core.color('#315575');
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

    bullet.events.on('out', () => outline.hide());

    const hoverState = bullet.states.create('hover');
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.strokeOpacity = 1;

    series.heatRules.push({target: bullet, min: 2, max: 60, property: 'radius'});

    bullet.adapter.add('tooltipY', (tooltipY, target) => -target.radius);

    graphEvolution.cursor = new am4charts.XYCursor();
    graphEvolution.cursor.behavior = 'zoomXY';
    graphEvolution.cursor.snapToSeries = series;
    graphEvolution.data = [
      {
        x: 100,
        y: 100,
        value: 1000,
        company: 'Flex'
      },
      {
        x: 50,
        y: 120,
        value: 1260,
        company: 'Paschoalotto'
      },
      {
        x: 80,
        y: 70,
        value: 1140,
        company: 'Zanc'
      },
    ];
  }

  ngOnDestroy(): void {
    if (!this.subscriptions.length) {
      return;
    }

    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );
  }

}
