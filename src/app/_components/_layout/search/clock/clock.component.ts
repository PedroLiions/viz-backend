import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import Timeout = NodeJS.Timeout;
import {User} from '../../../../models/User';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  user: User = JSON.parse(localStorage.getItem('user'));

  interval: Timeout;

  hour: any = '';
  day: any = '';
  dayOfWeek: any = '';
  month: any = '';
  year: any = '';

  lang: string;

  constructor() { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');

    this.tiktok();

    this.interval = setInterval(() => this.tiktok(), 1000 * 60);
  }


  tiktok(): void {
    const date = moment();
    const locale = date.locale(this.lang || 'pt-br');

    this.day = locale.format('DD');
    this.dayOfWeek = locale.format('dddd');
    this.month = locale.format('MMMM');
    this.hour = locale.format('HH[h]mm');
    this.year = locale.format('YYYY');
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
