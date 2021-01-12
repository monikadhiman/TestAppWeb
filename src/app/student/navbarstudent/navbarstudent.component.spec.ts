import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarstudentComponent } from './navbarstudent.component';

describe('NavbarstudentComponent', () => {
  let component: NavbarstudentComponent;
  let fixture: ComponentFixture<NavbarstudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
