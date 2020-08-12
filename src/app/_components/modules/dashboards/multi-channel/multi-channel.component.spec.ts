import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChannelComponent } from './multi-channel.component';

describe('MultiChannelComponent', () => {
  let component: MultiChannelComponent;
  let fixture: ComponentFixture<MultiChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
