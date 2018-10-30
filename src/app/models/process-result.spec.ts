/* tslint:disable:no-unused-variable */
import {ProcessResult} from "./process-result";
describe('process result', () => {
  beforeEach(() => {

  });

  it("create success payload", ()=>{
    expect(ProcessResult.success("SUCCESS").payload).toEqual('SUCCESS')
  })


});
