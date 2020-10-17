import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeByCompanyComponent } from './comparative-by-company.component';

describe('ComparativeByCompanyComponent', () => {
  let component: ComparativeByCompanyComponent;
  let fixture: ComponentFixture<ComparativeByCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparativeByCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
