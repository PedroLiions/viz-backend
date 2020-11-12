import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {PermissionsService} from '../../../../_services/auth/permissions.service';
import {faUserLock} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  windowWidth: number = window.innerWidth;

  faUserLock = faUserLock;

  dashboardsCarouselLg: OwlOptions = {
    loop: false,
    margin: 15,
    dots: true,
    responsive: {
      0: {
        items: 2
      },

      450: {
        items: 3
      },

      1399: {
        items: 8
      }
    }
  };

  constructor(
    private permissionsService: PermissionsService
  ) {
  }

  ngOnInit(): void {
    this.windowResizeListener();
  }

  windowResizeListener(): void {
    window.addEventListener(
      'resize',
      (event: any) => this.windowWidth = event.target.innerWidth
    );
  }

  checkCarousel(width): boolean {
    if (width === 'md') {
      return (
        this.windowWidth > 687
        && this.windowWidth < 1399
      );
    } else if (width === 'xl') {
      return (
        this.windowWidth > 1400
      );
    } else if (width === 'sm') {
      return (
        this.windowWidth <= 686
      );
    }
  }

  hasPermission(page: string): boolean {
    return this.permissionsService.hasPermission(page, 'read');
  }

}
