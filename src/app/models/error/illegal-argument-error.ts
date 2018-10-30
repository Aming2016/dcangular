import {PayloadAbility} from "../payload-ability";
import {SystemError} from "./system-error";
import {MsgCode} from "../dialog/msg-code";

export class IllegalArgumentError<T> extends SystemError<T> implements PayloadAbility<T>  {

  static readonly ErrorName : string = "IllegalArgumentError"
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


  constructor(public readonly code: any, public payload?: T) {
    super(code, payload);
    this.name = IllegalArgumentError.ErrorName
  }

  static create<T>(code : string | MsgCode, payload? :T) : IllegalArgumentError<T>{
    return new IllegalArgumentError(code, payload)
  }


  static readonly params_mssing = IllegalArgumentError.create("mandatory parameters missing")

}


function extend<T, U>(first: T, second: U): T & U {
  let result = {} as (T & U);
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}
