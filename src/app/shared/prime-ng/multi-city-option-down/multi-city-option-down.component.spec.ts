import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCityOptionDownComponent } from './multi-city-option-down.component';

describe('MultiCityOptionDownComponent', () => {
  let component: MultiCityOptionDownComponent;
  let fixture: ComponentFixture<MultiCityOptionDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCityOptionDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCityOptionDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
