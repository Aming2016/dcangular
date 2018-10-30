import { EmplServiceModule } from './empl-service.module';

describe('EmplServiceModule', () => {
  let emplServiceModule: EmplServiceModule;

  beforeEach(() => {
    emplServiceModule = new EmplServiceModule();
  });

  it('should create an instance', () => {
    expect(emplServiceModule).toBeTruthy();
  });
});
