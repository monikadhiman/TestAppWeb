import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotfoundforadminComponent } from './pagenotfoundforadmin.component';

describe('PagenotfoundforadminComponent', () => {
  let component: PagenotfoundforadminComponent;
  let fixture: ComponentFixture<PagenotfoundforadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagenotfoundforadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenotfoundforadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
