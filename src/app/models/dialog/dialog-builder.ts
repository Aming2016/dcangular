import {UIService} from "../../core/ui/ui.service";
import {DialogOptions, DialogType} from "./dialog-options";
import {LoggerService, Logger} from "../../data/logger/logger.service";
import {Observable} from "rxjs/Observable";

export class DialogBuilder{

  private logger : Logger
  subject : DialogOptions = new DialogOptions()
  constructor(private ui: UIService, private loggerService :LoggerService){
    this.logger = loggerService.createLogger(this)
  }

  bodyComponent(bodyComponent : any){
    this.subject.bodyComponent= bodyComponent
    return this
  }

  warn(){
    this.subject.dialogType = DialogType.warn
    return this
  }

  error(){
    this.subject.dialogType = DialogType.error
    return this
  }

  navParas(navParas : string|any[]){
    this.subject.navParas= navParas
    return this
  }

  iconClass(iconClass : string){
    this.subject.iconClass= iconClass
    return this
  }


  closable(closable : boolean = true){
    this.subject.closable= closable
    return this
  }

  showApprove(showApprove : boolean = true){
    this.subject.showApprove= showApprove
    return this
  }

  showDeny(showDeny : boolean = true){
    this.subject.showDeny= showDeny
    return this
  }

  open() : Observable<any>{
    this.logger.debug("put options into dialog stream ", this.subject)
    this.ui.dialog$.next(Object.freeze(this.subject))
    return this.subject.result$
  }

  get payload() {
    return this.subject.payload
  }

  set payload(payload : any) {
    this.subject.payload = payload
  }


  append(payload: any){
    if(this.payload == null){
      this.payload = payload
    } else if(payload != null) {
      Object.assign(this.payload, payload)
    }
    return this
  }

  set(attr: string, value: any): DialogBuilder {
    if(this.payload == null){
      this.payload = {attr:value} as any
    } else {
      this.payload[attr] = value
    }
    return this
  }

  get(attr: string): any {
    return this.payload[attr]
  }
}
