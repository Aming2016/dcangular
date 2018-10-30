import {SystemError} from "./system-error";
import {PayloadAbility} from "../payload-ability";
import {MsgCode} from "../dialog/msg-code";

export class DataIntegrityViolationError<T> extends SystemError<T> implements PayloadAbility<T>  {

  static readonly ErrorName : string = "DataIntegrityViolationError"
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
    super(code, payload);
    this.name = DataIntegrityViolationError.ErrorName
  }

  static create<T>(code : string | MsgCode, payload? :T) : DataIntegrityViolationError<T>{
    return new DataIntegrityViolationError(code, payload);
  }

}

