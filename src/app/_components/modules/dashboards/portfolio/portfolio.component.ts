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
      Contatos: 'bg-viz-gray',
      Tentativas: 'bg-viz-red',
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
