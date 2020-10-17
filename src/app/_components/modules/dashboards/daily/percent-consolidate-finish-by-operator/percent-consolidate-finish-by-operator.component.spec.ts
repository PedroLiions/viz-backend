import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentConsolidateFinishByOperatorComponent } from './percent-consolidate-finish-by-operator.component';

describe('PercentConsolidateFinishByOperatorComponent', () => {
  let component: PercentConsolidateFinishByOperatorComponent;
  let fixture: ComponentFixture<PercentConsolidateFinishByOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentConsolidateFinishByOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentConsolidateFinishByOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
