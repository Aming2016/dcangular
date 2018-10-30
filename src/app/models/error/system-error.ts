import {PayloadAbility} from "../payload-ability";

export class SystemError<T> extends Error implements PayloadAbility<T>  {
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

  static readonly ErrorName : string = "SystemError"
  constructor(public readonly code: any, public payload?: T) {
    super(code);
    this.payload = payload
    this.name = SystemError.ErrorName
    Object.setPrototypeOf(this, new.target.prototype);
  }


  static create<T>(code : any, payload? :T) : SystemError<T>{
    return new SystemError(code, payload)
  }

  static isMe(obj :any){
    return obj["name"] == SystemError.ErrorName && obj["code"] != null
  }
  static from<T>(obj : any){
    return new SystemError<T>(obj["code"], obj["payload"])
  }

  static no_implement = SystemError.create("Function is not implement yet!")

}

