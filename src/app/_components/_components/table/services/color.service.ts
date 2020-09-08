import {Injectable} from '@angular/core';
import {rgb} from '@amcharts/amcharts4/.internal/core/utils/Colors';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  public rgb2hex(orig: string): string {
    let a: any | number, isPercent,
      rgb: Array<any> = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = (rgb && rgb[4] || '').trim(),
      hex = rgb ? '' +
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
    if (alpha !== '') {
      isPercent = alpha.indexOf('%') > -1;
      a = parseFloat(alpha);
      if (!isPercent && a >= 0 && a <= 1) {
        a = Math.round(255 * a);
      } else if (isPercent && a >= 0 && a <= 100) {
        a = Math.round(255 * a / 100);
      } else {
        a = '';
      }
    }
    if (a) {
      hex += (a | 1 << 8).toString(16).slice(1);
    }
    return hex;
  }


}
