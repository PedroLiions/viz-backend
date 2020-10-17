import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComparativeCompanyComponent } from './panel-comparative-company.component';

describe('PanelComparativeCompanyComponent', () => {
  let component: PanelComparativeCompanyComponent;
  let fixture: ComponentFixture<PanelComparativeCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelComparativeCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComparativeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
