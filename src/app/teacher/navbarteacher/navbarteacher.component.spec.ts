import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarteacherComponent } from './navbarteacher.component';

describe('NavbarteacherComponent', () => {
  let component: NavbarteacherComponent;
  let fixture: ComponentFixture<NavbarteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
