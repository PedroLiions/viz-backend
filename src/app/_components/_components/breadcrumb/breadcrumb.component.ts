import {Component, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {

  private subscriptions: Array<Subscription> = [];
  public breadcrumbs: Array<string>;
  public title: string;

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    this.handleRouteData(router);
  }

  handleRouteData(router: Router): void {
    const subscription = router.events.pipe(filter(event => event instanceof ActivationStart))
      .subscribe((event: ActivationStart) => {
        const data = event.snapshot.data;

        if (data && data.breadcrumb) {
          this.breadcrumbs = data.breadcrumb;
        }

        if (data && data.title) {
          this.titleService.setTitle(`BI - ${data.title}`);
          this.title = data.title;
        }
      });

    this.subscriptions.push(subscription);
  }

  openLeftNav(): void {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('#leftsidebar');
    const classes = ['ls-closed', 'ls-toggle-menu'];

    classes.forEach(classe => body.classList.add(classe));
    sidebar.classList.add('open');
  }

  public ngOnDestroy(): void {
    if (!this.subscriptions.length) {
      return;
    }

    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );
  }


}
