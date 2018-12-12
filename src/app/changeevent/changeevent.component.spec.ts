import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeeventComponent } from './changeevent.component';

describe('ChangeeventComponent', () => {
  let component: ChangeeventComponent;
  let fixture: ComponentFixture<ChangeeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
