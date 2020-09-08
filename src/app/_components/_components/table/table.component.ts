import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

import {TableExcelService} from './services/table-excel.service';
import {Row} from './models/row.model';
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
    const subscription = this.http.get(this.dataUrl)
      .subscribe(response => this.handleInit(response));

    this.subscriptions.push(subscription);
  }

  handleInit(response: any): void {
    this.columns = response;

    if (!this.name) {
      this.name = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
    }

    this.classes.push(`table-${this.size}`);

    this.createColumnControl(response);
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

      const object = {
        columnName: column,
        show: true,
        classes: []
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
    console.log('this.tBodyColumnConfigs', this.tBodyColumnConfigs);
    this.objectKeys(this.tBodyColumnConfigs).forEach((column: string) => {
      console.log('column', column);
      const index = this.tBodyColumnConfigs[column].classes.indexOf('d-none');
      const classe = 'd-none';

      switch (this.markAllColumnsControl) {

        case 'show':
          if (index === -1) {
            this.tBodyColumnConfigs[column].classes.push(classe);
          }

          this.markAllColumnsControl = 'hidden';
          break;
        case 'hidden':
          if (index !== -1) {
            this.tBodyColumnConfigs[column].classes.splice(index, 1);
          }

          this.markAllColumnsControl = 'show';
          break;
      }
    });
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

  public exportJson(): void {
    this.getJsonTitleAndRows().then(
      data => this.tableJsonService.generateJson('json', data)
    );
  }

  public getJsonTitleAndRows(): Promise<Array<object>> {
    return new Promise<Array<object>>((resolve, reject) => {
      try {
        const body = this.columns.map((item) => {
          return item;
        });

        resolve(body);
      } catch (e) {
        reject(e);
      }
    });
  }

  /*
  * Export to XLSX
  * */
  public exportXlsx(): void {
    this.getExcelTitlesAndRows().then((rows: Array<any>) => {
      this.tableExcelService.generateExcel('table-exemplo', rows);
    });
  }

  /*
  * get table data in format of spreadsheet
  * */
  public getExcelTitlesAndRows(): Promise<Array<Row>> {
    return new Promise((resolve, reject) => {
      $(() => {
        try {
          const rows = [];

          const tableElement = document.querySelector(`#${this.name}`);
          const ths = tableElement.querySelectorAll('th');
          const trs = tableElement.querySelectorAll('tr');

          const tableTitles = [];
          ths.forEach((th) => {

            const thRow = this.mountElementRow(th);

            tableTitles.push(thRow); // first line is a titles
          }); // ths

          rows.push(tableTitles);

          trs.forEach(tr => {
            const tds = tr.querySelectorAll('td');
            const row: Array<Row> = [];

            tds.forEach(td => {

              const tdRow = this.mountElementRow(td);

              row.push(tdRow);

            }); // tds

            rows.push(row);

          }); // trs

          resolve(rows);
        } catch (e) {
          reject(e);
        }

      }); // end DOM initialized
    }); // end Promise
  }

  /*
  * Mount Row element
  * */
  public mountElementRow(element): Row {
    return {
      title: element.innerText,
      style: {
        backgroundColor: this.getPropertyVal(element, 'background-color'),
        color: this.getPropertyVal(element, 'color'),
        fontSize: this.getPropertyVal(element, 'font-size'),
        fontFamily: this.getPropertyVal(element, 'font-family'),
        textAlign: this.getPropertyVal(element, 'text-align')
      }
    } as Row;
  }

  /*
  * Get property value of DOM element
  * */
  public getPropertyVal(ele, property): string {
    return window.getComputedStyle(ele)[property];
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
