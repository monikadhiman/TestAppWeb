import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotfoundstudentComponent } from './pagenotfoundstudent.component';

describe('PagenotfoundstudentComponent', () => {
  let component: PagenotfoundstudentComponent;
  let fixture: ComponentFixture<PagenotfoundstudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagenotfoundstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenotfoundstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
