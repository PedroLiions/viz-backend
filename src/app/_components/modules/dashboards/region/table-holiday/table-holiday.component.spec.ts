import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHolidayComponent } from './table-holiday.component';

describe('TableHolidayComponent', () => {
  let component: TableHolidayComponent;
  let fixture: ComponentFixture<TableHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
