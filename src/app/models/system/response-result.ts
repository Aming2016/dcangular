import {ResultCode} from "./result-code";

export class ResResult<T>{


  constructor(public status : ResultCode,
  public msg? : string,
  public data? : T){}

  static is<T>(object : any) : object is ResResult<T>{
    if(object instanceof ResResult){
      return true
    }

    if(object['status'] == null){
      return false
    }
    return true
  }

  static from<T>(object : any) : ResResult<T>{
    if(object instanceof ResResult){
      return object
    }
    if(ResResult.is(object)){
      return new ResResult(object['status'],
        object['msg'],
        object['data'] as T)
    }
    return null
  }
}
