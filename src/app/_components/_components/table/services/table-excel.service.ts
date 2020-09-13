import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

import {Workbook} from 'exceljs';
import * as fs from 'file-saver';

import {Row} from '../models/row.model';
import {ColorService} from './color.service';
import {FontService} from './font.service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class TableExcelService {

  constructor(
    private datePipe: DatePipe,
    private colorService: ColorService,
    private fontService: FontService
  ) {
  }

  public createSpreadsheet(tableId: string, fileName: string): void {
    this.getExcelTitlesAndRows(tableId)
      .then(
        rows => this.generateExcel(fileName, rows)
      ).catch(
        error => alert('Erro ao gerar a planilha')
    );
  }

  /*
  * get table data in format of spreadsheet
  * */
  public getExcelTitlesAndRows(tableId): Promise<Array<Row>> {
    return new Promise((resolve, reject) => {
      $(() => {
        try {
          const rows = [];

          const tableElement = document.querySelector(`#${tableId}`);
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


  public generateExcel(name: string, rows: any): void {

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Planilha 1');

    rows.forEach((row: Array<Row>) => {

      if (!row.length) {
        return;
      }

      const titles = row.map(item => item.title);

      const tableRow = worksheet.addRow(titles);

      row.forEach((cell, i: number) => {

        const tableCell = tableRow.getCell(i + 1);

        const bgColor = cell.style.hasOwnProperty('backgroundColor')
          ? this.colorService.rgb2hex(cell.style.backgroundColor)
          : 'FFFFFF';

        tableCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: bgColor
          }
        };

        const color = cell.hasOwnProperty('color')
          ? this.colorService.rgb2hex(cell.style.color)
          : 'FFFFFF';

        const fontSize = this.fontService.px2Pt(cell.style.fontSize);

        tableCell.font = {
          color: {
            argb: color
          },
          size: fontSize,
        };

        tableCell.alignment = {
          horizontal: cell.style.textAlign
        };
      });

    });

    /* size of column */
    worksheet.columns.forEach(column => {
      const bigger: any = column.values.reduce((prev: string, current: string) => prev.length > current.length ? prev : current);
      const result: string = bigger;
      const max: number = bigger.length;
      column.width = max < 12 ? 14 : max + 2;
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, `${name}.xlsx`);
    });
  }
}
