import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRegionComponent } from './table-region.component';

describe('TableRegionComponent', () => {
  let component: TableRegionComponent;
  let fixture: ComponentFixture<TableRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
