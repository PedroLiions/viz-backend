import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionByOcurrenceComponent } from './distribution-by-ocurrence.component';

describe('DistributionByOcurrenceComponent', () => {
  let component: DistributionByOcurrenceComponent;
  let fixture: ComponentFixture<DistributionByOcurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionByOcurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionByOcurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
