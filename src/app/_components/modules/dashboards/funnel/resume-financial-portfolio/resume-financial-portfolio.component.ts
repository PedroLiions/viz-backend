import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-resume-financial-portfolio',
  templateUrl: './resume-financial-portfolio.component.html',
  styleUrls: ['./resume-financial-portfolio.component.scss']
})
export class ResumeFinancialPortfolioComponent implements OnInit {

  dataUrl = `${environment.API}/dashboards/funnel/resume-financial-by-portfolio`;

  callback: Function;

  constructor() { }

  ngOnInit(): void {
    this.callback = this.tdCallBack.bind(this);
  }

  tdCallBack(valueOfColumm: any, line, row): Array<string> {
    if (typeof line === 'number' && row === 1) {
      return ['font-weight-bold'];
    }

    return [''];
  }


}
