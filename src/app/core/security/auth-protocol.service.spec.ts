import { TestBed, inject } from '@angular/core/testing';

import { AuthProtocolService } from './auth-protocol.service';

describe('AuthProtocolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthProtocolService]
    });
  });

  it('should be created', inject([AuthProtocolService], (service: AuthProtocolService) => {
    expect(service).toBeTruthy();
  }));
});
