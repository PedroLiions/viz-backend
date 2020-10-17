import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public tableClass = [];
  public dataUrl = `${environment.API}/dashboards/daily/summary`;

  constructor() { }

  ngOnInit(): void {
  }
}
