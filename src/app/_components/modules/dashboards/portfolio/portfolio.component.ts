import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public columns: Array<string>;
  public body: Array<object>;
  public columnClasseConfig: object;
  public tableClass: Array<string>;
  public dataUrl: string;

  public tdCallback: Function;

  constructor() {

    this.columnClasseConfig = {
      'Contratos': 'bg-viz-gray',
      'Indicador': 'text-dark',
      // 'Agnt logados': 'bg-viz-dark',
      'Tentativas': 'bg-viz-red',
      'Tent/ Agnt': 'bg-viz-red-dark',
      '%Hit rate': 'bg-caramel-dark',
      'Atendidas': 'bg-caramel',
      'CPC': 'bg-ocean-light',
      'CPC/ Agnt': 'bg-esmerald-dark',
      'CPC/ Atend': 'bg-esmerald-dark',
      'CPCA': 'bg-green-light',
      'CPCA /Agnt': 'bg-green-dark',
      'CPCA /Atend': 'bg-green-dark',
      'Negociações': 'bg-blue-light',
      'Negoc /Agnt': 'bg-blue-marine',
      'Negoc /Tent': 'bg-blue-marine',
      'Negoc /Atend': 'bg-blue-marine',
      'Negoc /CPC': 'bg-blue-marine',
      'Negoc /CPCA': 'bg-blue-marine',
      '%Improd': 'bg-orange',
      '%Linha muda': 'bg-orange-dark',
      '%Voz máquina': 'bg-orange-dark',
      'Spin rate': 'text-dark',
      '%Incorreto': 'text-dark',
    };



    this.tableClass = ['table-costumized'];

    this.dataUrl = `${environment.API}/dashboards/portfolio`;
  }

  ngOnInit(): void {
    this.tdCallback = this.callBackTd.bind(this);
  }

  callBackTd(valueOfColumm): Array<string> {
    return [''];
  }

}
