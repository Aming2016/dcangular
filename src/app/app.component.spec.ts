/* tslint:disable:no-unused-variable */
import {TestBed, async} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {TestingModule} from "./testing/testing.module";
import {AppUIModule} from "./app-ui/app-ui.module";

describe('App: WebDemo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, AppUIModule],
      declarations: [
        AppComponent
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
