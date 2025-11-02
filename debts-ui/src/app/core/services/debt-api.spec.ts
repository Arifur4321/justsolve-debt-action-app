import { TestBed } from '@angular/core/testing';

import { DebtApi } from './debt-api';

describe('DebtApi', () => {
  let service: DebtApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
