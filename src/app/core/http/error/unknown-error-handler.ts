import {ErrorResultHandler} from "./error-result-handler";
import {ResResult} from "../../../models/system/response-result";
import {Injectable} from "@angular/core";
import {UtilService} from "../../util.service";
import {Logger} from "../../../data/logger/logger.service";

@Injectable()
export class UnknownErrorHandler implements ErrorResultHandler<any>{
  private logger: Logger

  constructor(private util: UtilService) {
    this.logger = util.createLogger(this)
  }
  acceptError(err: ResResult<any>) {
    return true
  }
  retrieveErrorMessage(err: ResResult<any>) {
    this.logger.error("server error with detail:", err)
    return err.msg || err.data || err
  }

}
