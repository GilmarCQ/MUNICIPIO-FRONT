import { TestBed } from '@angular/core/testing';

import { MineduService } from './minedu.service';

describe('MineduService', () => {
  let service: MineduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MineduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
