import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeuserComponent } from './changeuser.component';

describe('ChangeuserComponent', () => {
  let component: ChangeuserComponent;
  let fixture: ComponentFixture<ChangeuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
