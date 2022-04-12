import { TestBed } from '@angular/core/testing';

import { ConsistencyService } from './consistency.service';

describe('ConsistencyService', () => {
  let service: ConsistencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsistencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
