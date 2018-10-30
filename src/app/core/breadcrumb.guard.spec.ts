import { TestBed, async, inject } from '@angular/core/testing';

import { BreadcrumbGuard } from './breadcrumb.guard';

describe('BreadcrumbGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbGuard]
    });
  });

  it('should ...', inject([BreadcrumbGuard], (guard: BreadcrumbGuard) => {
    expect(guard).toBeTruthy();
  }));
});
