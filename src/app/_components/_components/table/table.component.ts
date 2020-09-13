import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {Subscription} from 'rxjs';

import {TableExcelService} from './services/table-excel.service';
import {TableJsonService} from './services/table-json.service';

declare var $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  /*
  * data for table
  */
  @Input() columns: Array<object>;
  /*
  * ID of table, opcional, generate automatic
  * */
  @Input() name: string;
  /*
  * Size of bootstrap table
  * */
  @Input() size = 'sm';
  /*
  * Classes of table element
  * */
  @Input() classes: Array<string> = [];
  /*
  * Config of classes columns
  * */
  @Input() columnClasseConfig: object;
  /*
  * End point of data
  * */
  @Input() dataUrl: string;

  /**
   * Classes of wrapper
   */
  @Input() tableWrapperClasses: Array<string> = [];

  /*
  * End point parameters
  * */
  @Input() params: object = {};

  /*
  * Paginate
  * */
  pages: Array<any> = new Array<any>();
  currentPage = 1;

  /*
  * for when ondestroy unsubscribe all observables
  * */
  readonly subscriptions: Array<Subscription> = [];

  tHeadColumn: Array<string>;
  tBodyColumnConfigs: object = {};

  markAllColumnsControl: 'show' | 'hidden' = 'show';

  /*
  * Option callback of each td
  * */
  @Input() callbackClassOfTd: (columnValue: string) => Array<string> = () => [''];
  @Input() callbackStyleTd: (columnValue: string) => object = () => new Object();

  constructor(
    private http: HttpClient,
    private ref: ElementRef,
    private tableExcelService: TableExcelService,
    private tableJsonService: TableJsonService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  public transpose(): void {
    this.columns = Object.keys(this.columns[0]).map(
      c => this.columns.map(
        r => r[c]
      )
    );
  }

  public getData(params: object = {}): void {
    let httpParams = new HttpParams();

    this.objectKeys(params).forEach(
      key => httpParams = httpParams.append(key, params[key])
    );

    const subscription = this.http.get(this.dataUrl, {params: httpParams})
      .subscribe(response => this.handleInit(response));

    this.subscriptions.push(subscription);
  }

  public handleInit(response: any): void {
    this.columns = response.data;

    if (!this.name) {
      this.name = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
    }

    this.classes.push(`table-${this.size}`);

    this.createColumnControl(this.columns);

    this.configPaginate(response);
  }

  public configPaginate(response: any): void {
    this.pages = new Array<any>(response.last_page);
  }

  public getDataPage(page: number): void {
    if (
      page === 0
      || page > this.pages.length
    ) {
      return;
    }

    this.params['page'] = page;
    this.currentPage = page;

    this.getData(this.params);
  }

  public setOrderBy(column: string): void {
    let orderBy;

    switch (this.tBodyColumnConfigs[column].orderBy) {
      case 'asc':
        orderBy = 'desc';
        break;
      case 'desc':
        orderBy = '';
        break;
      default:
        orderBy = 'asc';
        break;
    }

    this.tBodyColumnConfigs[column].orderBy = orderBy;

    this.params[column] = orderBy;

    this.getData(this.params);
  }

  public caretInView(tHeadColumn: string): string {
    const orderBy = this.getOrderBy(tHeadColumn);
    switch (orderBy) {
      case 'asc':
        return 'up';
      case 'desc':
        return 'down';
      default:
        return 'both';
    }
  }

  public getOrderBy(column: string): string {
    return this.tBodyColumnConfigs[column].orderBy;
  }

  /*
  * transform object in array
  * */
  public objectValues(item: object): Array<string> {
    return Object.values(item);
  }

  /*
  * get keys of object
  *  */
  public objectKeys(item: object): Array<string> {
    return Object.keys(item);
  }

  public getClass(columnName: string): string | void {
    if (typeof this.columnClasseConfig[columnName] !== 'undefined') {
      return this.columnClasseConfig[columnName];
    }
  }

  /*
  * Create object for control DOM of element
  * */
  public createColumnControl(data): void {
    this.tHeadColumn = this.objectKeys(data[0]);

    this.tHeadColumn.forEach(column => {

      if (typeof this.tBodyColumnConfigs[column] === 'object') {
        return;
      }

      const object = {
        columnName: column,
        show: true,
        classes: [],
        orderBy: ''
      };

      const classes = this.getClass(column);

      if (classes) {
        object.classes = [classes];
      }

      this.tBodyColumnConfigs[column] = object;
    });
  }

  /*
  * Get TD class
  * */
  public getColumnClasses(column): Array<string> | string {
    return (
      typeof this.tBodyColumnConfigs[column] !== 'undefined'
      && typeof this.tBodyColumnConfigs[column].classes !== 'undefined'
    )
      ? this.tBodyColumnConfigs[column].classes
      : '';
  }

  /*
  * toggle all columns, hide/show
  * */
  markAllColumns(): void {
  }

  /*
  * Toggle classse of TD
  * */
  public toggleColumnClasse(column: string, classe: string): void {
    const index = this.tBodyColumnConfigs[column].classes.indexOf(classe);

    if (index === -1) {
      this.tBodyColumnConfigs[column].classes.push(classe);
    } else {
      this.tBodyColumnConfigs[column].classes.splice(index, 1);
    }
  }

  /*
  * get type of cell, if is even or odd
  * */
  public getRel(index): string {
    return ((index % 2 === 0) ? 'even' : 'odd');
  }

  /*
  * Export to JSON
  * */
  public exportJson(): void {
    this.tableJsonService.createJSON(this.columns);
  }

  /*
  * Export to XLSX
  * */
  public exportXlsx(): void {
    this.tableExcelService.createSpreadsheet(
      this.name,
      'Tabela de exemplo'
    );
  }

  /*
  * Open window.print API
  * */
  public printTable(): void {
    window.print();
    const table = document.getElementById(this.name);
    const newWin = window.open('');
    newWin.document.write(table.outerHTML);
    newWin.print();
    newWin.close();
  }

  /*
  * Set table container full screen
  *  */
  public fullScreen(): void {
    const index = this.tableWrapperClasses.indexOf('fullscreen');

    (index === -1)
      ? this.tableWrapperClasses.push('fullscreen')
      : this.tableWrapperClasses.splice(index, 1);
  }

  /*
  * When component is ended, all subscription in observable is unsubscribe
  * This is done to remove unused observables of the memory
  * */
  ngOnDestroy(): void {
    if (!this.subscriptions.length) {
      return;
    }

    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );
  }
}
