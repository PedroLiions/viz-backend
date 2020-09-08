import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  public px2Pt(px: string): number {
    const numberInPx: number = parseInt(px.replace(/^\D+/g, ''));
    return numberInPx;
    // return 3 / 4 * numberInPx;
  }
}
