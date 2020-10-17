import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../_services/authentication.service';

import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.scss']
})
export class RightNavComponent implements OnInit {

  public isNightMode: any;
  public searchToggle = true;
  public rtlToggle = false;

  constructor(
    private languageService: TranslateService,
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isNightMode = localStorage.getItem('isNightMode');
    this.rtlToggle = !(localStorage.getItem('rtlToggle'));

    if (this.isNightMode) {
      document.querySelector('body').classList.add('theme-dark');
    } else {
      document.querySelector('body').classList.remove('theme-dark');
    }
  }

  changeLang(lang): void {
    this.languageService.setDefaultLang(lang);
  }

  toggleNightMode(): void {
    if (! this.isNightMode) {
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
