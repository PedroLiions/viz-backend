import {Component} from '@angular/core';
import {User} from '../../../models/User';

@Component({
  selector: 'app-default-layout-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  leftToggleMenu = true;
  activeMenu = '';
  user: User = JSON.parse(localStorage.getItem('user'));
  pagesAndPermissions = JSON.parse(localStorage.getItem('pages-and-permissions'));

  constructor() {
  }

  toggleAsideMenu(): void {
    if (this.leftToggleMenu) {
      document.querySelector('body').classList.add('ls-toggle-menu');
    } else {
      document.querySelector('body').classList.remove('ls-toggle-menu');
    }

    this.leftToggleMenu = !this.leftToggleMenu;
  }

  openItem(item: string): void {
    if (this.activeMenu === item) {
      this.activeMenu = '';
    } else {
      this.activeMenu = item;
    }
  }

  hasPermissionOfPage(route: string): boolean {
    let hasPermission = false;

    this.pagesAndPermissions.forEach(page => {
      if (page.route === route) {
        hasPermission = true;
      }
    });

    return hasPermission;
  }

  existPageInModule(module): boolean {
    let existPageInModule = false;

    this.pagesAndPermissions.forEach(page => {
      page.modules.forEach(m => {
        if (m.name === module) {
          existPageInModule = true;
        }
      });
    });

    return existPageInModule;
  }

}
