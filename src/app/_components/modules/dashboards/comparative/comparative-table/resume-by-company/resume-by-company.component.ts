import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-resume-by-company',
  templateUrl: './resume-by-company.component.html',
  styleUrls: ['./resume-by-company.component.scss']
})
export class ResumeByCompanyComponent implements OnInit {

  public tableClass = [];

  public columnClasseConfig = {};

  public dataUrl = `${environment.API}/dashboards/comparative/resume-by-company`;

  constructor() {
  }

  ngOnInit(): void {
    this.columnClasseConfig = {
      'Tentativas': 'bg-viz-red',
      '%Hit rate': 'bg-viz-caramel-dark',
      '%CPC': 'bg-viz-ocean-900',
      '%CPCA': 'bg-viz-green',
      'Negociações': 'bg-viz-blue',
      '%Negc': 'bg-viz-marine'
    };
  }

}
