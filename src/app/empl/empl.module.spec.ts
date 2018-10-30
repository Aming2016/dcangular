import { EmplModule } from './empl.module';

describe('EmplModule', () => {
  let emplModule: EmplModule;

  beforeEach(() => {
    emplModule = new EmplModule();
  });

  it('should create an instance', () => {
    expect(emplModule).toBeTruthy();
  });
});
