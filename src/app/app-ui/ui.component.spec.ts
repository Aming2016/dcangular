/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {UIComponent} from "./ui.component";
import {TestingModule} from "../testing/testing.module";
import {DialogComponent} from "./dialog/dialog.component";

describe('UIComponent', () => {
  let component: UIComponent;
  let fixture: ComponentFixture<UIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ UIComponent, DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
