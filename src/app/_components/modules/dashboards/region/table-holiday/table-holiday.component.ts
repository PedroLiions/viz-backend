import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-table-holiday',
  templateUrl: './table-holiday.component.html',
  styleUrls: ['./table-holiday.component.scss']
})
export class TableHolidayComponent implements OnInit {

  dataUrl = `${environment.API}/dashboards/region/holiday`;

  constructor() { }

  ngOnInit(): void {
  }

}
