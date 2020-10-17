import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-table-city-state',
  templateUrl: './table-city-state.component.html',
  styleUrls: ['./table-city-state.component.scss']
})
export class TableCityStateComponent implements OnInit {

  dataUrlState = `${environment.API}/dashboards/region/state`;
  dataUrlCity = `${environment.API}/dashboards/region/city`;

  columnClasseConfig = {};

  callbackTable: Function

  constructor() {
  }

  ngOnInit(): void {
    this.callbackTable = this.callBackTD.bind(this);

    this.columnClasseConfig = {
      Tentativas: 'bg-viz-red',
      Atendidas: 'bg-viz-caramel',
      '%Hit rate': 'bg-viz-caramel-dark',
      '%CPC': 'bg-viz-ocean-900',
      '%Negociações': 'bg-viz-blue',
      '%Negc': 'bg-viz-marine',
      '%Improd': 'bg-viz-orange',
      '%Mute': 'bg-viz-orange-900',
      '%Machine': 'bg-viz-orange-900',
      'TMA': 'bg-viz-blue-100'
    };
  }

  callBackTD(valueOfColumn, row, line): Array<string> {
    if (valueOfColumn === 'TOTAL') {
      return ['bg-gray', 'text-white'];
    }

    if (row === 0 && line > 0) {
      return ['font-weight-bold'];
    }


    return [];
  }

}
