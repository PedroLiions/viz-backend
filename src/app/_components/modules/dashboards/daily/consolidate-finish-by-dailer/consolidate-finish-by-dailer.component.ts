import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-consolidate-finish-by-dailer',
  templateUrl: './consolidate-finish-by-dailer.component.html',
  styleUrls: ['./consolidate-finish-by-dailer.component.scss']
})
export class ConsolidateFinishByDailerComponent implements OnInit {

  dataUrl = `${environment.API}/dashboards/daily/consolidate-finish-by-dialer`;

  constructor() { }

  ngOnInit(): void {
  }

}
