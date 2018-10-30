import { TestBed, inject } from '@angular/core/testing';

import { WeChatService } from './we-chat.service';

describe('WeChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeChatService]
    });
  });

  it('should ...', inject([WeChatService], (service: WeChatService) => {
    expect(service).toBeTruthy();
  }));
});
