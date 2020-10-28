import {Component} from '@angular/core';

import {
  faCaretDown,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-caret',
  templateUrl: './caret.component.html',
  styleUrls: ['./caret.component.scss']
})
export class CaretComponent {
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  icon = faCaretDown;

  mouseEnter(): void {
    this.icon = this.faCaretUp;
  }

  mouseLeave(): void {
    this.icon = this.faCaretDown;
  }

}
