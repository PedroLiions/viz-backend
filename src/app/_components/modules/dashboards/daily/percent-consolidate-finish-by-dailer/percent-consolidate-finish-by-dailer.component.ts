import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-percent-consolidate-finish-by-dailer',
  templateUrl: './percent-consolidate-finish-by-dailer.component.html',
  styleUrls: ['./percent-consolidate-finish-by-dailer.component.scss']
})
export class PercentConsolidateFinishByDailerComponent implements OnInit {

  dataUrl = `${environment.API}/dashboards/daily/percent-consolidate-finish-by-dialer`;

  constructor() { }

  ngOnInit(): void {
  }

}
