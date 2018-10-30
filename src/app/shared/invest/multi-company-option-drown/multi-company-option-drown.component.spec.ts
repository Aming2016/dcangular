import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCompanyOptionDrownComponent } from './multi-company-option-drown.component';

describe('MultiCompanyOptionDrownComponent', () => {
  let component: MultiCompanyOptionDrownComponent;
  let fixture: ComponentFixture<MultiCompanyOptionDrownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCompanyOptionDrownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCompanyOptionDrownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
