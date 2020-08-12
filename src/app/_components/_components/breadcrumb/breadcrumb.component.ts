import {Component} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  constructor() {
  }

  openLeftNav(): void {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('#leftsidebar');
    const classes = ['ls-closed', 'ls-toggle-menu'];

    classes.forEach(classe => body.classList.add(classe));
    sidebar.classList.add('open');
  }

}
