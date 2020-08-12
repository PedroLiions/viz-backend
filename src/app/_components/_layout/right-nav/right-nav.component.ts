import {Component, OnInit} from '@angular/core';
import {isBooleanLiteralLike} from 'codelyzer/util/utils';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.scss']
})
export class RightNavComponent implements OnInit {

  isNightMode: boolean = true;
  searchToggle: boolean = true;
  rtlToggle: boolean = false;
  languageService: TranslateService;

  constructor(
    languageService: TranslateService
  ) {
    this.languageService = languageService;
  }

  ngOnInit(): void {
    this.isNightMode = !(localStorage.getItem('isNightMode'));
    this.rtlToggle = !(localStorage.getItem('rtlToggle'));
  }

  changeLang(lang): void {
    this.languageService.setDefaultLang(lang);
  }

  toggleNightMode(): void {
    if (this.isNightMode) {
      document.querySelector('body').classList.add('theme-dark');
      localStorage.setItem('isNightMode', 'true');
    } else {
      document.querySelector('body').classList.remove('theme-dark');
      localStorage.removeItem('isNightMode');
    }

    this.isNightMode = !this.isNightMode;
  }

  toggleSearch(): void {
    document.querySelector('#search').classList.add('open');
  }

  toggleRtl(): void {
    if (this.rtlToggle) {
      document.querySelector('body').classList.add('rtl');
      localStorage.setItem('rtlToggle', 'true');
    } else {
      document.querySelector('body').classList.remove('rtl');
      localStorage.removeItem('rtlToggle');
    }

    this.rtlToggle = !this.rtlToggle;
  }

}
