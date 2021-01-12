import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotfoundteacherComponent } from './pagenotfoundteacher.component';

describe('PagenotfoundteacherComponent', () => {
  let component: PagenotfoundteacherComponent;
  let fixture: ComponentFixture<PagenotfoundteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagenotfoundteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenotfoundteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
