import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApiclientService } from './apiclient.service';

describe('ApiclientService', () => {
  let service: ApiclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiclientService]
    });
    service = TestBed.inject(ApiclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
