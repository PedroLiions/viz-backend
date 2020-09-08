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

}
