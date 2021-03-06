import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit, ViewEncapsulation
} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {Subscription} from 'rxjs';

import {TableExcelService} from './services/table-excel.service';
import {TableJsonService} from './services/table-json.service';

import * as _ from 'underscore';

import {
  faFileExcel,
  faStream,
  faThList,
  faPrint,
  faRetweet,
  faCaretUp,
  faCaretDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnDestroy {

  tries = 0;

  /*
  * data for table
  */
  @Input() columns: Array<object>;
  columnsTranpose: Array<any>;
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
  @Input() columnClasseConfig: object = {};
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
  tHeadColumnTranspose: Array<string>;
  tBodyColumnConfigs: object = {};
  tBodyColumnConfigsTranspose: object = {};

  /* value of search */
  valueSearch: string;

  /*
  * type of table
  * */
  tableType: 'normal' | 'transpose' = 'normal';

  /* fa icons */
  faFileExcel = faFileExcel;
  faStream = faStream;
  faThList = faThList;
  faPrint = faPrint;
  faRetweet = faRetweet;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;

  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  faExpandArrowsAlt = faExpandArrowsAlt;
  faCompressArrowsAlt = faCompressArrowsAlt;

  faEllipsisV = faEllipsisV;

  windowIcon = faExpandArrowsAlt;

  /*
  * Option callback of each td
  * */
  @Input() callbackClassOfTd: (columnValue: string, indexOfLine: number, indexOfColumn: number, element: string, tableType: string | null) => Array<string> = () => [''];
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
    let columns: Array<object>;

    columns = Object.keys(this.columns[0]).map(
      c => this.columns.map(
        r => r[c]
      )
    );

    columns = columns.filter((item, index) => index > 0);

    columns.forEach((item: Array<any>, index) => {
      item.unshift(
        this.tHeadColumn[index + 1]
      );
    });

    this.columnsTranpose = columns;

    const storageTableType: any = localStorage.getItem(`dinamic-table-${this.name}`);

    this.setTranspose(storageTableType);
  }

  public setTranspose(tableType: 'normal' | 'transpose' | null): void {
    if (tableType == null) {
      this.tableType = (this.tableType === 'normal') ? 'transpose' : 'normal';
      localStorage.setItem(`dinamic-table-${this.name}`, this.tableType);
    } else {
      this.tableType = tableType;
      localStorage.setItem(`dinamic-table-${this.name}`, tableType);
    }
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

    this.transpose();
  }

  public configPaginate(response: any): void {
    this.pages = new Array<any>(1);
  }

  public getDataPage(search: number): void {
    this.params['search'] = search;

    this.getData(this.params);
  }

  public setOrderBy(column: string): void {
    let orderBy;

    let tableColumns;
    let tBodyConfig;
    if (this.tableType === 'transpose') {
      tableColumns = 'columnsTranspose';
      tBodyConfig = 'tBodyColumnConfigsTranspose';
    } else {
      tableColumns = 'columns';
      tBodyConfig = 'tBodyColumnConfigs';
    }

    switch (this[tBodyConfig][column].orderBy) {
      case 'both':
        orderBy = 'asc';
        this[tableColumns] = _.sortBy(this[tableColumns], column).reverse();
        break;
      case 'asc':
        orderBy = 'desc';
        this[tableColumns] = _.sortBy(this[tableColumns], column);
        break;
      case 'desc':
        orderBy = 'both';
        this[tableColumns] = _.sortBy(this[tableColumns], column).reverse();
        break;
      default:
        orderBy = 'asc';
        this[tableColumns] = _.sortBy(this[tableColumns], column);
        break;
    }

    this[tBodyConfig][column].orderBy = orderBy;
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

  private getOrderBy(column: string): string {
    return (this.tableType === 'transpose')
      ? this.tBodyColumnConfigsTranspose[column].orderBy
      : this.tBodyColumnConfigs[column].orderBy;
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
  private createColumnControl(data): void {
    this.tHeadColumn = this.objectKeys(data[0]);
    this.tHeadColumnTranspose = data.map(item => item[Object.keys(item)[0]]);
    this.tHeadColumnTranspose.unshift(this.tHeadColumn[0]);

    this.tHeadColumn.forEach(column => this.constructObjectOfTHead(column, 'tBodyColumnConfigs'));
    this.tHeadColumnTranspose.forEach(column => this.constructObjectOfTHead(column, 'tBodyColumnConfigsTranspose'));
  }

  private constructObjectOfTHead(column, bodyConfig): any {
    if (typeof this[bodyConfig][column] === 'object') {
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

    this[bodyConfig][column] = object;
  }

  /*
  * Get TD class
  * */
  public getColumnClasses(column): Array<string> | string {
    try {
      if (this.tableType === 'transpose') {
        let classes = [];

        try {
          classes = classes.concat(this.tBodyColumnConfigs[column].classes);
        } catch (e) {}

        try {
          classes = classes.concat(this.tBodyColumnConfigsTranspose[column].classes);
        } catch (e) {}

        return classes;
      } else if (this.tableType === 'normal') {
        return this.tBodyColumnConfigs[column].classes;
      }
    } catch (e) {
      return [];
    }

    // const obj = 'tBodyColumnConfigs';
    //
    // try {
    //   if (this.tableType === 'normal') {
    //     return this[obj][column].classes;
    //   } else {
    //     // if (this.tries < 2) {
    //     this.tries++;
    //     // console.log("classes normais", this.tBodyColumnConfigs[column].classes, "classes tranpose", this.tBodyColumnConfigsTranspose[column].classes);
    //     // }
    //   }
    //
    //   return [];
    // } catch (e) {
    //   return '';
    // }
  }

  public search(event): void {
    this.getData({
      search: event.currentTarget.value
    });
  }

  public getRowTransposeClass(index: number, column): string | Array<string> {
    try {
      return this.getColumnClasses(column[0]);
    } catch (e) {
      return '';
    }
  }

  /*
  * toggle all columns, hide/show
  * */
  public markAllColumns(): void {
    const obj = (this.tableType === 'normal')
      ? 'columns'
      : 'columnsTranpose';

    let iterator;

    if (obj === 'columns') {
      iterator = this.objectKeys(this.columns[0]);
    } else {
      iterator = this.tHeadColumnTranspose;
    }

    for (const c of iterator) {
      this.addColumnClasse(c, 'd-none');
    }
  }

  /*
  * Toggle classse of TD
  * */
  public toggleColumnClasse(
    column: string,
    classe: string
  ): void {
    const obj = (this.tableType === 'normal')
      ? 'tBodyColumnConfigs'
      : 'tBodyColumnConfigsTranspose';

    const index = this[obj][column].classes.indexOf(classe);

    /* if not exist class, add */
    if (index === -1) {
      this[obj][column].classes.push(classe);
    } else {
      this[obj][column].classes.splice(index, 1);
    }
  }

  public addColumnClasse(
    column: string,
    classe: string
  ): void {
    const obj = (this.tableType === 'normal')
      ? 'tBodyColumnConfigs'
      : 'tBodyColumnConfigsTranspose';

    const index = this[obj][column].classes.indexOf(classe);

    if (index === -1) {
      return;
    }

    this[obj][column].classes.splice(index, 1);
  }

  public existClasse(column, classe): boolean {
    try {
      const obj = (this.tableType === 'normal')
        ? 'tBodyColumnConfigs'
        : 'tBodyColumnConfigsTranspose';

      const index = this[obj][column].classes.indexOf(classe);

      return index === -1;
    } catch (e) {
      return false;
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
    // window.print();
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

    if (index === -1) {
      this.tableWrapperClasses.push('fullscreen');
      this.windowIcon = this.faCompressArrowsAlt;
    } else {
      this.windowIcon = this.faExpandArrowsAlt;
      this.tableWrapperClasses.splice(index, 1);
    }
  }

  public getStyleOfTHead(valueOfColumn): Array<string> {
    if (typeof valueOfColumn === 'string') {
      if (valueOfColumn.indexOf('/') === -1) {
        return [];
      }

      return ['break-space'];
    }

    return [];
  }

  public getNgClassOfThNormal(value, indexOfColumn): string[] {
    const columnClasses = this.getColumnClasses(value);
    const classesOfCallback = this.callbackClassOfTd(value, indexOfColumn, indexOfColumn, 'thead', 'normal');
    const classOfTHead = this.getStyleOfTHead(value);

    return [].concat(columnClasses, classesOfCallback, classOfTHead);
  }

  public getNgClassOfThTranspose(value, indexOfColumn, indexOfLine, element, tableType): Array<string> {
    const callbackClasses = this.callbackClassOfTd(value, indexOfColumn, indexOfLine, 'thead', tableType);
    const columnClasses = this.getColumnClasses(value);
    const rowTransposeClass = this.getRowTransposeClass(indexOfColumn, this.tHeadColumnTranspose);
    const styleOfTHead = this.getStyleOfTHead(value);

    return [].concat(callbackClasses, columnClasses, rowTransposeClass, styleOfTHead);
  }

  public getClassOfTheadTranspose(): string | string[] {
    return this.getRowTransposeClass(1, this.tHeadColumnTranspose);
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
