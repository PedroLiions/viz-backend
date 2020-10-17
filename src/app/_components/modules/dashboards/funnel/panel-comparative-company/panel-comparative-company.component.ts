import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-panel-comparative-company',
  templateUrl: './panel-comparative-company.component.html',
  styleUrls: ['./panel-comparative-company.component.scss']
})
export class PanelComparativeCompanyComponent implements OnInit {

  dataUrl = `${environment.API}/dashboards/funnel/panel-comparative-company`;

  columnClasseConfig: object;

  callback: Function;

  constructor() {
  }

  ngOnInit(): void {
    this.columnClasseConfig = {
      Attempts: 'bg-viz-red',
      Answered: 'bg-viz-caramel',
      CPC: 'bg-viz-ocean',
      CPCA: 'bg-viz-green-100',
      Deals: 'bg-viz-blue',
    };

    this.callback = this.tdCallBack.bind(this);
  }

  tdCallBack(valueOfColumn, line, row): any {
    if (typeof line === 'number' && (line === 0 || row === 1)) {
      return ['font-weight-bold'];
    }

    return [''];
  }

}
