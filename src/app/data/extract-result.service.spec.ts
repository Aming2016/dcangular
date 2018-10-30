/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {ExtractResultService} from "./extract-result.service";
import {TestingModule} from "../testing/testing.module";

describe('ExtractResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [ExtractResultService]
    });
  });

  it('should ...', inject([ExtractResultService], (service: ExtractResultService) => {
    expect(service).toBeTruthy();
  }));
});
