import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidateFinishByDailerComponent } from './consolidate-finish-by-dailer.component';

describe('ConsolidateFinishByDailerComponent', () => {
  let component: ConsolidateFinishByDailerComponent;
  let fixture: ComponentFixture<ConsolidateFinishByDailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidateFinishByDailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidateFinishByDailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
