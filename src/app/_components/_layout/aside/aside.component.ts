import {Component} from '@angular/core';
import {User} from '../../../_models/User';

@Component({
  selector: 'app-default-layout-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  leftToggleMenu: boolean = true;
  activeMenu: string = "";
  user: User = JSON.parse(localStorage.getItem('user'));


  constructor() {
  }

  toggleAsideMenu(): void {
    if (this.leftToggleMenu) {
      document.querySelector('body').classList.add('ls-toggle-menu');
    } else {
      document.querySelector('body').classList.remove('ls-toggle-menu');
    }

    this.leftToggleMenu = ! this.leftToggleMenu;
  }

  openItem(item: string): void {
    if (this.activeMenu == item) {
      this.activeMenu = "";
    } else {
      this.activeMenu = item;
    }
  }

}
