import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';
import {Daily} from '../../../../_documentation/dashboards/daily.response';

declare var $: any;

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})

export class DailyComponent{


  constructor() {
  }


}
