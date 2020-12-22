import {Component} from '@angular/core';
import {FiltersService} from '../../../../_services/filters/filters.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent {
  public data: object;

  public details: Array<any>;

  constructor(
    private filters: FiltersService
  ) {
    this.filters.event.subscribe(next => {
      console.log('alterouuuuu', next);
    });
  }

}
