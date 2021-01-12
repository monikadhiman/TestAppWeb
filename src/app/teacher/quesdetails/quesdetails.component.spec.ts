import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesdetailsComponent } from './quesdetails.component';

describe('QuesdetailsComponent', () => {
  let component: QuesdetailsComponent;
  let fixture: ComponentFixture<QuesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
