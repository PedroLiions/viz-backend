import {Component} from '@angular/core';
import {ActivationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  public breadcrumbs: Array<string>;
  public title: string;

  constructor(
    private router: Router
  ) {
    this.handleRouteData(router);
  }

  handleRouteData(router: Router): void {
    router.events.pipe(filter(event => event instanceof ActivationStart))
      .subscribe((event: ActivationStart) => {
        const data = event.snapshot.data;

        if (data && data.breadcrumb) {
          this.title = data.title;
          this.breadcrumbs = data.breadcrumb;
        }
      });
  }

  openLeftNav(): void {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('#leftsidebar');
    const classes = ['ls-closed', 'ls-toggle-menu'];

    classes.forEach(classe => body.classList.add(classe));
    sidebar.classList.add('open');
  }


}
