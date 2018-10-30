import {InjectionToken} from "@angular/core";
import {ResResult} from "../../../models/system/response-result";


export const ERROR_RESULT_HANDLE_TOKEN : InjectionToken<ErrorResultHandler<any>> = new InjectionToken("ERROR_RESULT_HANDLE_TOKEN")


export interface ErrorResultHandler<T>{

  retrieveErrorMessage(err : ResResult<T>);
  acceptError(err : ResResult<T>);

}
