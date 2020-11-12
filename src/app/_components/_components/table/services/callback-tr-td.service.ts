import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallbackTrTdService {

  /*
  * Set bold to first line and field total
  */
  public setBoldTotalAndFirstLine(valueOfColumn, row, line): Array<string> {
    if (valueOfColumn === 'TOTAL') {
      return ['bg-gray', 'text-total'];
    }

    return [];
  }

}
