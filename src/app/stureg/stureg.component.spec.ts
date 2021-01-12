import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SturegComponent } from './stureg.component';

describe('SturegComponent', () => {
  let component: SturegComponent;
  let fixture: ComponentFixture<SturegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SturegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SturegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
