import {Component} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
  selector: 'app-index-menu',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  faTimes = faTimes;



  footerCarousel: OwlOptions = {
    loop: false,
    margin: 10,
    dots: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      1200: {
        items: 4
      }
    }
  };

  closeSearch(): void {
    document.querySelector('#search').classList.remove('open');
  }


}
