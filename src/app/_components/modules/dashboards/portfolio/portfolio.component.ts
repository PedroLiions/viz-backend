import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  dataUrlFinancialPortfolio = `${environment.API}/dashboards/portfolio/resume-financial-portfolio`;

  dataUrlResumeByContracts = `${environment.API}/dashboards/portfolio/resume-by-contracts`;

  callBackfinancialPortfolio: Function;

  CallbackResumeByContracts: Function;

  constructor() {}

  ngOnInit(): void {
    this.callBackfinancialPortfolio = this.tdCallBackfinancialPortfolio.bind(this);
    this.CallbackResumeByContracts = this.tdCallbackResumeByContracts.bind(this);
  }

  tdCallBackfinancialPortfolio(valueOfColumm: any, row, line): Array<string> {
    if (typeof line === 'number' && line === 1) {
      return ['font-weight-bold'];
    }

    if (valueOfColumm === 'TOTAL') {
      return ['bg-deep-agents-2', 'text-white'];
    }

    return [''];
  }

  tdCallbackResumeByContracts(valueOfColumm: any, row, line) {
    if (valueOfColumm === 'TOTAL') {
      return ['bg-deep-agents-2', 'text-white'];
    }

    return [''];
  }

}
