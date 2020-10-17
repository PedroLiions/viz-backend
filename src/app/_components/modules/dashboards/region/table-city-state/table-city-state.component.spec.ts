import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCityStateComponent } from './table-city-state.component';

describe('TableCityStateComponent', () => {
  let component: TableCityStateComponent;
  let fixture: ComponentFixture<TableCityStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCityStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCityStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
