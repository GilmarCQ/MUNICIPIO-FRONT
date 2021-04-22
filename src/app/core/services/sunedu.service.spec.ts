import { TestBed } from '@angular/core/testing';

import { SuneduService } from './sunedu.service';

describe('SuneduService', () => {
  let service: SuneduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuneduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
