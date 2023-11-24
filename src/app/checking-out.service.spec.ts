import { TestBed } from '@angular/core/testing';

import { CheckingOutService } from './checking-out.service';

describe('CheckingOutService', () => {
  let service: CheckingOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckingOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
