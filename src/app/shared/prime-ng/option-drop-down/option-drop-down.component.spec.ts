import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionDropDownComponent } from './option-drop-down.component';

describe('OptionDropDownComponent', () => {
  let component: OptionDropDownComponent;
  let fixture: ComponentFixture<OptionDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
