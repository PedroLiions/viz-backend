import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-percent-consolidate-finish-by-operator',
  templateUrl: './percent-consolidate-finish-by-operator.component.html',
  styleUrls: ['./percent-consolidate-finish-by-operator.component.scss']
})
export class PercentConsolidateFinishByOperatorComponent implements OnInit {

  dataUrl = `${environment.API}/dashboards/daily/percent-consolidate-finish-by-operator`;

  constructor() { }

  ngOnInit(): void {
  }

}
