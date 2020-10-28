import {Component, OnInit} from '@angular/core';

import interact from 'interactjs';
import {Event, NavigationStart, Router} from '@angular/router';

import {faAnchor, faGripVertical} from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private draggableElement: any;
  private interact;

  public enabled: boolean;
  public inRoute: string;

  public faAnchor = faAnchor;
  public faGripVertical = faGripVertical;

  constructor(
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.draggableElement = $('.draggable');

    this.subscribeRoute();

    if (! this.inRoute) {
      this.inRoute = window.location.pathname;
    }
  }

  subscribeRoute(): void {
    this.route.events.subscribe((event: Event) => {
      if (!(event instanceof NavigationStart)) {
        return;
      }

      this.inRoute = event.url;
      // after change page, set origin position
      this.setInitialPosition();
    });
  }

  draggable(): void {
    $('app-filter > .a-icon').addClass('text-warning');

    this.draggableElement.addClass('d-block');

    const position = {x: 0, y: 0};

    this.interact = interact('.draggable').draggable({
      listeners: {
        // start(event: any): void {
        //   event.target.classList.add('d-block');
        // },
        move(event: any): void {
          position.x += event.dx;
          position.y += event.dy;

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
      }
    });

    this.enabled = true;
  }

  setInitialPosition(): void {
    // disabled interact
    interact('.draggable').draggable({
      enabled: false
    });

    this.draggableElement.removeClass('d-block');
    this.draggableElement.removeAttr('style');

    this.enabled = false;

    $('app-filter > .a-icon').removeClass('text-warning');
  }

}
