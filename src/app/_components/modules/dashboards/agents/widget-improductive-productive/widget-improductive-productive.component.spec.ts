import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetImproductiveProductiveComponent } from './widget-improductive-productive.component';

describe('WidgetImproductiveProductiveComponent', () => {
  let component: WidgetImproductiveProductiveComponent;
  let fixture: ComponentFixture<WidgetImproductiveProductiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetImproductiveProductiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetImproductiveProductiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
