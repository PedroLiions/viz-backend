import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-index-menu',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  dashboardsCarousel: OwlOptions = {
    loop: false,
    margin: 10,
    dots: false,
    responsive: {
      0: {
        items: 2
      },
      512: {
        items: 3
      },
      768: {
        items: 3
      },
      992: {
        items: 5
      },
      1200: {
        items: 8
      }
    }
  };
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

  ngOnInit(): void {
  }

  closeSearch(): void {
    document.querySelector('#search').classList.remove('open');
  }

}
