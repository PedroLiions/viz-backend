import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comparative',
  templateUrl: './comparative.component.html',
  styleUrls: ['./comparative.component.scss']
})
export class ComparativeComponent implements OnInit, OnDestroy {

  public data: any;

  public subscriptions: Array<Subscription> = [];

  constructor(
    private dashboardsService: DashboardsService
  ) { }

  ngOnInit(): void {
    const subs = this.dashboardsService.comparative()
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
