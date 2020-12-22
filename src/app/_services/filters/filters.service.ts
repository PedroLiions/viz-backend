import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  event: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.event.emit(this.get());
  }

  set(formValues): void {
    this.emit(formValues);
  }

  get(): object | null {
    return JSON.parse(localStorage.getItem('filters'));
  }

  emit(filters): void {
    localStorage.setItem('filters', JSON.stringify(filters));

    this.event.next(filters);
  }

}
