import {Injectable} from "@angular/core";
import {UtilService} from "./util.service";
import {Logger} from "../data/logger/logger.service";
import {SystemError} from "../models/error/system-error";
import {MsgCode} from "../models/dialog/msg-code";

@Injectable()
export class WeChatService {

  private logger: Logger

  constructor(private util: UtilService) {
    this.logger = util.createLogger(this)
  }

  isWeChatError(error : any){
    if(error instanceof SystemError){
      if(error.code == MsgCode.error_wechat){
        return true
      }
    }
    return false
  }

  static readonly WeChatErrorCode = {
    "invalid_code" : 40029,
    "code_been_used":40163
  }

  errcode(error : any) : number{
    if(this.isWeChatError(error)){
      return error.payload.errcode
    }
    return null
  }

  errmsg(error : any) : string{
    if(this.isWeChatError(error)){
      return error.payload.errmsg
    }
    return null
  }


  isInvalidCode(error : any) {
    if(this.errcode(error) ==  WeChatService.WeChatErrorCode["invalid_code"]){
      return true
    }
    return false;
  }

  isCodeBeenUsed(error : any) {
    if(this.errcode(error) ==  WeChatService.WeChatErrorCode["code_been_used"]){
      return true
    }
    return false;
  }

}
