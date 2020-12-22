import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallbackTrTdService {

  /*
  * Set bold to first line and field total
  */
  public setBoldTotalAndFirstLine(valueOfColumn, row = null, line = null, element = null, tableType = null): Array<string> {
    const classes: Array<string> = [];

    if (tableType === 'normal') {
      if (row === 0 && element === 'tbody') {
        classes.push('font-weight-bold');
      }
    } else {
      if (line === 1 && element === 'tbody') {
        classes.push('font-weight-bold');
      }
    }

    if (typeof valueOfColumn === 'string' && valueOfColumn.toUpperCase() === 'TOTAL') {
      classes.push('bg-gray', 'text-total');
    }

    return classes;
  }

}
