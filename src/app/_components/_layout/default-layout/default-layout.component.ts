import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  rightToggleMenu: boolean = true;

  constructor() {
  }

  ngOnInit(): void {

  }

  toggleRightMenu(): void {
    if (this.rightToggleMenu) {
      document.querySelector('body').classList.add('right_icon_toggle');
    } else {
      document.querySelector('body').classList.remove('right_icon_toggle');
    }

    this.rightToggleMenu = !this.rightToggleMenu;
  }

}
