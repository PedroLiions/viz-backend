import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {CallbackTrTdService} from '../../../../_components/table/services/callback-tr-td.service';

@Component({
  selector: 'app-distribution-by-hour',
  templateUrl: './distribution-by-hour.component.html',
  styleUrls: ['./distribution-by-hour.component.scss']
})
export class DistributionByHourComponent implements OnInit {
  columnClasseConfig: object = {};

  tableClass = [];

  tdCallback: Function;

  dataUrl = `${environment.API}/dashboards/best-time/distribution-by-hour`;

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

  callBackTd(valueOfColumm, indexOfLine, indexOfColumn, element, tableType): Array<string> {
    return this.callbackTrTdService.setBoldTotalAndFirstLine(valueOfColumm, indexOfLine, indexOfColumn, element, tableType);
  }

}
