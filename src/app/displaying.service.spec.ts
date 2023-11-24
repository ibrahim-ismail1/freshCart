import { TestBed } from '@angular/core/testing';

import { DisplayingService } from './displaying.service';

describe('DisplayingService', () => {
  let service: DisplayingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
