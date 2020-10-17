import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidateFinishByOperatorComponent } from './consolidate-finish-by-operator.component';

describe('ConsolidateFinishByOperatorComponent', () => {
  let component: ConsolidateFinishByOperatorComponent;
  let fixture: ComponentFixture<ConsolidateFinishByOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidateFinishByOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidateFinishByOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
