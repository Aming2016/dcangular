import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {DialogBuilder} from "../../models/dialog/dialog-builder";
import {DialogOptions} from "../../models/dialog/dialog-options";
import {BusinessError} from "../../models/error/business-error";
import {PrimaryType} from "../../models/common-type";
import {LoggerService, Logger} from "../../data/logger/logger.service";
import {MsgCode} from "../../models/dialog/msg-code";
import {MessagesComponent} from "../../app-ui/dialog/messages/messages.component";
import "rxjs/add/operator/map";


/**
 * provide the common ui relative service, like dialog, window size detection
 * Need support from AppComponent
 */
@Injectable()
export class UIService {

  // for resize window, Must use BehaviorSubject. the last status is required.
  // new subscriber should receive the last window size immediately
  private resizeSubject$ = new BehaviorSubject<{width:number, height:number}>({width:0, height:0})

  private logger : Logger


  constructor(private loggerService :LoggerService) {
    this.logger = loggerService.createLogger(this)
  }

  windowResize(dimension: {width:number, height:number}){
    this.resizeSubject$.next(dimension)
  }

  windowSize$() : Observable<{width:number, height:number}>{
    return this.resizeSubject$;
  }

  compactWidth$() : Observable<boolean>{
    return this.windowSize$().map(dimension=> {
      return dimension.width < 370
    })
  }


  compactHeight$() : Observable<boolean>{
    return this.windowSize$().map(dimension=> dimension.height < 500)
  }

  // message and dialog should not use BehaviorSubject
  // the last status should never pass to the new message panel or dialog
  messagePanel$ = new Subject<BusinessError<any>|string>()

  sendMessagePanel<T>(error : BusinessError<T>|string){
    this.messagePanel$.next(error)
  }

  _dialog$ = new Subject<DialogOptions>()

  get dialog$(){
    return this._dialog$
  }

  dialogBuilder<T extends Array<PrimaryType>>(){
    return new DialogBuilder(this, this.loggerService)
  }

  info(message : string|MsgCode, payload? : any){
    return this.dialogBuilder()
      .bodyComponent(MessagesComponent)
      .set("bodyKey",message)
      .append(payload)
  }
  warn(message : string|MsgCode, payload? : any){
    return this.info(message,payload).warn()
  }

  error(message : string|MsgCode, payload? : any){
    return this.info(message,payload).error()
  }
}

