import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfaveventsComponent } from './myfavevents.component';

describe('MyfaveventsComponent', () => {
  let component: MyfaveventsComponent;
  let fixture: ComponentFixture<MyfaveventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfaveventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfaveventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
