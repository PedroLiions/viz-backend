import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardsService} from '../../../../_services/http/dashboards/dashboards.service';
import {Daily} from '../../../../_documentation/dashboards/daily.response';

declare var $: any;

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})

export class DailyComponent implements OnInit, AfterViewInit, OnDestroy {

  public data: any;

  public subscriptions: Array<Subscription> = [];

  constructor(
    private zone: NgZone,
    private dashboardsService: DashboardsService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const subs = this.dashboardsService.daily()
        .subscribe((response: Daily) => this.handleResponse(response));

      this.subscriptions.push(subs);
    });
  }

  dispachDataTable(): void {
    const bootstrapTableConfig = {
      exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
      pagination: true,
      showColumns: true,
      pageList: [10, 25, 100, 200],
      showExport: true,
      // showToggle: true,
      sortStable: true,

      showFullscreen: true,
      showPrint: true,

      // data: this.data.dailySummary,
      totalField: 'count',
      sorting: true,

      search: true,
      dataToggle: false,
      cache: false,

      sortable: true,
    };

    const $tabledailySummary = $('#dailySummary');
    const $tableFinishByOperator = $('#dailyConsolideteFinishByOperator');
    const $tableFinishByOperatorPercentage = $('#dailyConsolideteFinishByOperatorPercentage');
    const $dailyConsolideteFinishByDialer = $('#dailyConsolideteFinishByDialer');
    const $dailyConsolideteFinishByDialerPercentage = $('#dailyConsolideteFinishByDialerPercentage');

    $tabledailySummary.bootstrapTable(bootstrapTableConfig);
    $tabledailySummary.bootstrapTable('hideLoading');

    $tableFinishByOperator.bootstrapTable(bootstrapTableConfig);
    $tableFinishByOperator.bootstrapTable('hideLoading');

    $tableFinishByOperatorPercentage.bootstrapTable(bootstrapTableConfig);
    $tableFinishByOperatorPercentage.bootstrapTable('hideLoading');

    $dailyConsolideteFinishByDialer.bootstrapTable(bootstrapTableConfig);
    $dailyConsolideteFinishByDialer.bootstrapTable('hideLoading');

    $dailyConsolideteFinishByDialerPercentage.bootstrapTable(bootstrapTableConfig);
    $dailyConsolideteFinishByDialerPercentage.bootstrapTable('hideLoading');

  }

  public handleResponse(response): void {
    this.data = response;

    this.data.dailySummary = this.transpose(response.dailySummary);
    this.data.dailySummary = this.formatData(this.data.dailySummary);


    /* detect changes and render DOM */
    this.cdRef.detectChanges();
    this.dispachDataTable();
  }

  public formatData(array): object {
    // get titles
    const thead = array.shift();
    // get bodies
    const tbody = array.slice(1, array.count);

    return {
      tbody,
      thead
    };
  }

  public transpose(a: Array<any>): Array<any> {
    return Object.keys(a[0]).map((c) => a.map((r) => r[c]));
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
