import { TestBed } from '@angular/core/testing';

import { ApiopeniaService } from './apiopenia.service';

describe('ApiopeniaService', () => {
  let service: ApiopeniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiopeniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
