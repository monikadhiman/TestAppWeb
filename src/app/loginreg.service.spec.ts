import { TestBed } from '@angular/core/testing';

import { LoginregService } from './loginreg.service';

describe('LoginregService', () => {
  let service: LoginregService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginregService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
