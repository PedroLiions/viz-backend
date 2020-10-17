import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeFinancialPortfolioComponent } from './resume-financial-portfolio.component';

describe('ResumeFinancialPortfolioComponent', () => {
  let component: ResumeFinancialPortfolioComponent;
  let fixture: ComponentFixture<ResumeFinancialPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeFinancialPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeFinancialPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
