import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-distribution-by-ocurrence',
  templateUrl: './distribution-by-ocurrence.component.html',
  styleUrls: ['./distribution-by-ocurrence.component.scss']
})
export class DistributionByOcurrenceComponent implements OnInit {

  env = environment;

  tableClass = [];

  columnClasseConfig: object = {};

  dataUrl = `${this.env.API}/dashboards/distribution`;

  constructor() {
  }

  ngOnInit(): void {
    this.columnClasseConfig = {
      Agente: 'bg-viz-gray',
      Tentativas: 'bg-viz-red',
      Atendidas: 'bg-viz-caramel',
      CPC: 'bg-viz-ocean',
      '%CPC': 'bg-viz-ocean-900',
      'CPCA': 'bg-viz-green-100',
      '%CPCA': 'bg-viz-green',
      'Negociações': 'bg-viz-blue',
      '%Negc': 'bg-viz-marine'
    };
  }


}
