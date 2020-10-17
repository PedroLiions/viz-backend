import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-consolidate-finish-by-operator',
  templateUrl: './consolidate-finish-by-operator.component.html',
  styleUrls: ['./consolidate-finish-by-operator.component.scss']
})
export class ConsolidateFinishByOperatorComponent implements OnInit {

  dataUrl = `${environment.API}/dashboards/daily/consolidate-finish-by-operator`;

  constructor() {
  }

  ngOnInit(): void {
  }

}
