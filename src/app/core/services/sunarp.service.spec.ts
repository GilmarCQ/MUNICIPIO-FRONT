import { TestBed } from '@angular/core/testing';

import { SunarpService } from './sunarp.service';

describe('SunarpService', () => {
  let service: SunarpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SunarpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
