import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMiniComponent } from './line-mini.component';

describe('LineMiniComponent', () => {
  let component: LineMiniComponent;
  let fixture: ComponentFixture<LineMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
