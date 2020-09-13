import * as fs from 'file-saver';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableJsonService {

  public generateJson(name: string, json: object): void {
    const jsonString = JSON.stringify(json);
    const blob = new Blob([jsonString], {type: 'application/json'});

    fs.saveAs(blob, name);
  }

  public createJSON(columns, fileName: string = 'json_file'): void {
    this.getJsonTitleAndRows(columns).then(
      data => this.generateJson(fileName, data)
    );
  }

  public getJsonTitleAndRows(columns): Promise<Array<object>> {
    return new Promise<Array<object>>((resolve, reject) => {
      try {
        const body = columns.map((item) => {
          return item;
        });

        resolve(body);
      } catch (e) {
        reject(e);
      }
    });
  }

}
