import {PayloadAbility} from "../payload-ability";
import {MsgCode} from "../dialog/msg-code";

export class BusinessError<T> extends Error implements PayloadAbility<T>  {

  static readonly ErrorName = "BusinessError"
  set(attr: string, value: any): PayloadAbility<T> {
    this.payload[attr] = value
    return this;
  }

  get(attr: string): any {
    if(this.payload == null){
      return null
    }
    return this.payload[attr];
  }

  constructor(public readonly code: string | MsgCode, public payload?: T) {
    super(code)
    this.payload = payload
    this.name = BusinessError.ErrorName
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static create<T>(code : string | MsgCode, payload? :T) : BusinessError<T>{
    return new BusinessError<T>(code, payload)
  }

  static from<T>(obj : any){
    return new BusinessError<T>(obj["code"], obj["payload"])
  }

  static readonly no_login = BusinessError.create(MsgCode.error_no_login)

}

