import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCompanyOptionDrownComponent } from './single-company-option-drown.component';

describe('SingleCompanyOptionDrownComponent', () => {
  let component: SingleCompanyOptionDrownComponent;
  let fixture: ComponentFixture<SingleCompanyOptionDrownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCompanyOptionDrownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCompanyOptionDrownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
