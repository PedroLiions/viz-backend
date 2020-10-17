import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentConsolidateFinishByDailerComponent } from './percent-consolidate-finish-by-dailer.component';

describe('PercentConsolidateFinishByDailerComponent', () => {
  let component: PercentConsolidateFinishByDailerComponent;
  let fixture: ComponentFixture<PercentConsolidateFinishByDailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentConsolidateFinishByDailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentConsolidateFinishByDailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
