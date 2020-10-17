import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

  env = environment;

  dataUrl = `${this.env.API}/dashboards/agents`;

  tableClass = [];

  columnClasseConfig: object;

  tdCallback: Function;

  constructor() {
    this.columnClasseConfig = {};
  }

  ngOnInit(): void {
    this.tdCallback = this.callBackTd.bind(this);
  }

  callBackTd(valueOfColumm): Array<string> {
    const classes: Array<string> = [];

    if (typeof valueOfColumm === 'number') {
      if (valueOfColumm < 150) {
        classes.push('bg-success');
      } else if (valueOfColumm >= 150 && valueOfColumm < 300) {
        classes.push('bg-warning');
      } else if (valueOfColumm >= 300) {
        classes.push('bg-danger');
      }
    }

    classes.push('text-dark');

    return classes;
  }

}
