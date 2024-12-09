import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { ServiceDBService } from './service-db.service';

describe('ServiceDBService', () => {
  let service: ServiceDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });
    service = TestBed.inject(ServiceDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
