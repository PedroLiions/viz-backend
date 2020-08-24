import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit, OnDestroy {

  public data: any;

  public subscriptions: Array<Subscription> = [];

  constructor(
    private dashboardsService: DashboardsService
  ) { }

  ngOnInit(): void {
    const subs = this.dashboardsService.daily()
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
