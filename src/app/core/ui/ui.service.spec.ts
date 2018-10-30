/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {UIService} from "./ui.service";
import {TestingModule} from "../../testing/testing.module";

describe('UIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [UIService]
    });
  });

  it('should ...', inject([UIService], (service: UIService) => {
    expect(service).toBeTruthy();
  }));
});
