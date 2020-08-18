import { Component, OnInit } from '@angular/core';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent {
  public data: object;

  constructor(
    private dashboardsService: DashboardsService
  ) {
    // dashboardsService.getAgentsDashboard()
    //   .subscribe(response => this.data = response);
  }



}
