import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeByCompanyComponent } from './resume-by-company.component';

describe('ResumeByCompanyComponent', () => {
  let component: ResumeByCompanyComponent;
  let fixture: ComponentFixture<ResumeByCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeByCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
