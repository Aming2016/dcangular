/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsoleLoggerService } from './console-logger.service';
import {TestingModule} from "../../testing/testing.module";

describe('ConsoleLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [ConsoleLoggerService]
    });
  });

  it('should ...', inject([ConsoleLoggerService], (service: ConsoleLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
