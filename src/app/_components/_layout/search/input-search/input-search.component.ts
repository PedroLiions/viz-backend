import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../../../../_serivces/http/search.service';
import {Router} from '@angular/router';
import {Page} from '../../../../models/Page';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnDestroy {

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {
  }

  subscriptions: Array<Subscription> = [];

  listSearch: Array<Page>;

  searchWords = '';

  search(): void {
    const subs = this.searchService.search(this.searchWords)
      .subscribe(response => this.listSearch = response);

    this.subscriptions.push(subs);
  }

  navigate(route): void {
    route = '/' + route;

    this.router.navigate([route]).then(() => this.closeSearch());
  }

  closeSearch(): void {
    document.querySelector('#search').classList.remove('open');
  }

  ngOnDestroy(): void {
    if (!this.subscriptions.length) {
      return;
    }

    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }


}
