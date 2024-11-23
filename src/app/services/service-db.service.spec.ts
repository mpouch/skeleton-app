import { TestBed } from '@angular/core/testing';

import { ServiceDBService } from './service-db.service';

describe('ServiceDBService', () => {
  let service: ServiceDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
