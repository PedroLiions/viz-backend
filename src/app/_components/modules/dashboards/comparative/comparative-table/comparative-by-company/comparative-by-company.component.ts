import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {CallbackTrTdService} from '../../../../../_components/table/services/callback-tr-td.service';

@Component({
  selector: 'app-comparative-by-company',
  templateUrl: './comparative-by-company.component.html',
  styleUrls: ['./comparative-by-company.component.scss']
})
export class ComparativeByCompanyComponent implements OnInit {

  columnClasseConfig: object = {};

  tableClass = [];

  callbackTable: Function;

  dataUrl = `${environment.API}/dashboards/comparative/comparative-by-company`;

  constructor(
    private callbackTrTdService: CallbackTrTdService
  ) {
  }

  ngOnInit(): void {
    this.columnClasseConfig = {
      'Agentes': 'bg-viz-dark',
      'Contratos': 'bg-viz-gray',
      Tentativas: 'bg-viz-red',
      'Spin rate': 'bg-viz-red-900',
      'Tent /Agnt': 'bg-viz-red-900',
      '%Incorreto': 'bg-purple',
      Atendidas: 'bg-brow',
      '%Hit rate': 'bg-brow-900',
      CPC: 'bg-viz-ocean',
      'CPC /Agnt': 'bg-viz-ocean-900',
      '%CPC /Aten': 'bg-viz-ocean-900',
      'CPCA': 'bg-viz-green-100',
      'CPCA /Agnt': 'bg-viz-green',
      '%CPCA /Aten': 'bg-viz-green',
      'Negociações': 'bg-viz-blue',
      'Negc /Agnt': 'bg-viz-marine',
      '%Negc /Tent': 'bg-viz-marine',
      '%Negc /Atend': 'bg-viz-marine',
      '%Negc /CPC': 'bg-viz-marine',
      '%Negc /CPCA': 'bg-viz-marine',
      '%Improd': 'bg-viz-orange-900',
      '%Linha muda': 'bg-viz-orange-900',
      '%Voz Máq': 'bg-viz-orange-900'
    };

    this.callbackTable = this.callbackTableTotal.bind(this);
  }

  callbackTableTotal(valueOfColumm, indexOfLine, indexOfColumn, element, tableType): Array<string> {
    return this.callbackTrTdService.setBoldTotalAndFirstLine(valueOfColumm, indexOfLine, indexOfColumn, element, tableType);
  }

}
