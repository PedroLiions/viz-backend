import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {CallbackTrTdService} from '../../../../_components/table/services/callback-tr-td.service';

@Component({
  selector: 'app-distribution-by-hour',
  templateUrl: './distribution-by-hour.component.html',
  styleUrls: ['./distribution-by-hour.component.scss']
})
export class DistributionByHourComponent implements OnInit {

  env = environment;

  tableClass = [];

  columnClasseConfig: object = {};

  dataUrl = `${this.env.API}/dashboards/best-time/distribution-by-hour`;

  tdCallback: Function;

  constructor(
    private callbackTrTdService: CallbackTrTdService
  ) {
  }

  ngOnInit(): void {
    this.columnClasseConfig = {
      'Best time': 'bg-viz-yellow',
      'Atendidas': 'bg-viz-caramel',
      Tentativas: 'bg-viz-red',
      '%Hit rate': 'bg-viz-caramel-dark',
      'Negociações': 'bg-viz-blue',
      '%Negc': 'bg-viz-marine',
      '%CPC': 'bg-viz-ocean-900',
      '%CPCA': 'bg-viz-green',
    };

    this.tdCallback = this.callBackTd.bind(this);
  }

  callBackTd(valueOfColumm, indexOfLine, indexOfColumn): Array<string> {
    return this.callbackTrTdService.setBoldTotalAndFirstLine(valueOfColumm, indexOfLine, indexOfColumn);
  }

}
