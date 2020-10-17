import { Component, OnInit } from '@angular/core';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent {
  public data: object;

  public details: Array<any>;

  constructor(
    private dashboardsService: DashboardsService
  ) {

  }

}
