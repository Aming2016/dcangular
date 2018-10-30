import {PayloadBuilder} from "./payload-builder"; // for class been extended , must import directly!!! make it loaded ahead of others
import {PrimaryType} from "./common-type";
import {IllegalArgumentError} from "./error/illegal-argument-error";
import {PayloadAbility} from "./payload-ability";
import {BusinessError} from "./error/business-error";
import {SystemError} from "./error/system-error";

import * as debug from "debug";
const logger = debug("app:models")

export class ProcessResult<T> implements PayloadAbility<T>{

  static readonly ResultName = "ProcessResult"
  name
  constructor(public processName?: string,
              public payload?: T) {
    this.name = ProcessResult.ResultName
  }

  static isMe(x :any){
    return x["name"] == ProcessResult.ResultName
  }

  static success(...params : PrimaryType[]) : ProcessResult<PrimaryType[]> | ProcessResult<PrimaryType>{
    if(params.length == 1) {
      return ProcessResult.builder<PrimaryType>().append(params[0]).create()
    }
    return ProcessResult.builder<PrimaryType[]>().append(params).create()
  }

  static builder<FT>(processName? : string) {
    return new PayloadBuilder<ProcessResult<FT>, FT>(ProcessResult, processName)
  }

  static from<FT>(obj: any) : Readonly<ProcessResult<FT>> {
    return ProcessResult.builder<FT>(obj["processName"]).append(obj["payload"]).create()
  }

  set(attr: string, value: any) {
    this.payload[attr] = value
    return this
  }

  get(attr: string): any {
    return this.payload[attr]
  }

}


