import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestTimeComponent } from './best-time.component';

describe('BestTimeComponent', () => {
  let component: BestTimeComponent;
  let fixture: ComponentFixture<BestTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
