import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../_services/authentication.service';

import Swal from 'sweetalert2';
import {NavigationStart, Router} from '@angular/router';


@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.scss']
})
export class RightNavComponent implements OnInit {

  public isNightMode: any;
  public searchToggle = true;
  public rtlToggle = false;

  public interact: any;

  public route: string;

  constructor(
    private languageService: TranslateService,
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route = window.location.pathname;

    this.isNightMode = localStorage.getItem('isNightMode');
    this.rtlToggle = !(localStorage.getItem('rtlToggle'));

    /* set language saved in storage */
    const defaultLang = localStorage.getItem('lang');
    this.languageService.setDefaultLang(defaultLang);

    /* set theme saved in local storage*/
    if (this.isNightMode) {
      document.querySelector('body').classList.add('theme-dark');
    } else {
      document.querySelector('body').classList.remove('theme-dark');
    }

    this.subsRoute();
  }

  enableFilter(): boolean {
    return (this.route.indexOf('dashboards') > -1);
  }

  subsRoute(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.route = event.url;
      }
    });
  }

  changeLang(lang): void {
    localStorage.setItem('lang', lang);
    this.languageService.setDefaultLang(lang);
  }

  toggleNightMode(): void {
    if (!this.isNightMode) {
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

  async logout(): Promise<any> {
    let desmissed;

    await Swal.fire({
      title: 'Sair',
      text: 'Tem certeza que deseja sair?',
      confirmButtonText: 'Sim, sair',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não, não sair'
    })
      .then(
        result => desmissed = result.isDismissed
      );

    // if clicked in cancel
    if (desmissed) {
      return;
    }

    /* invalid token */
    await this.authService.logout().then();
    /* send to login screen */
    this.router.navigate(['/login']).then();
  }

}
