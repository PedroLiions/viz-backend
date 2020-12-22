import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAgentsComponent } from './filter-agents.component';

describe('FilterAgentsComponent', () => {
  let component: FilterAgentsComponent;
  let fixture: ComponentFixture<FilterAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
