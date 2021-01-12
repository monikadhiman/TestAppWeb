import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StutestComponent } from './stutest.component';

describe('StutestComponent', () => {
  let component: StutestComponent;
  let fixture: ComponentFixture<StutestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StutestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StutestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
