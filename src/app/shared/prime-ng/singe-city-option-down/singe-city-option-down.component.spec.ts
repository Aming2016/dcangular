import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingeCityOptionDownComponent } from './singe-city-option-down.component';

describe('SingeCityOptionDownComponent', () => {
  let component: SingeCityOptionDownComponent;
  let fixture: ComponentFixture<SingeCityOptionDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingeCityOptionDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingeCityOptionDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
