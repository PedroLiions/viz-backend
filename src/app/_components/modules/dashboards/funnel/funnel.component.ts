import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';

@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FunnelComponent implements OnInit, OnDestroy {

  public data: any;

  public subscriptions: Array<Subscription> = [];

  constructor(
    private dashboardsService: DashboardsService
  ) { }

  ngOnInit(): void {
    const subs = this.dashboardsService.funnel()
      .subscribe(response => {
        this.data = response;
      });

    this.subscriptions.push(subs);
  }

  ngOnDestroy(): void {
    if (!this.subscriptions.length) {
      return;
    }

    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );
  }
}
