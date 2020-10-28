import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretComponent } from './caret.component';

describe('CaretComponent', () => {
  let component: CaretComponent;
  let fixture: ComponentFixture<CaretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
