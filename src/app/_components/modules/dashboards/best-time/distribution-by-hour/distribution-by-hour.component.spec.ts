import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionByHourComponent } from './distribution-by-hour.component';

describe('DistributionByHourComponent', () => {
  let component: DistributionByHourComponent;
  let fixture: ComponentFixture<DistributionByHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionByHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionByHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
