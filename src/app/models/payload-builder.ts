import {PayloadAbility} from "./payload-ability";
import {ArrayPayload} from "./payload-type";
import {PrimaryType} from "./common-type";

export class PayloadBuilder<U extends PayloadAbility<T>, T> implements PayloadAbility <T>{

  get payload() {
    return this.subject.payload
  }

  set payload(payload : T) {
    this.subject.payload = payload
  }

  protected subject : U
  constructor(private SubjectType : new (...args : any[]) => U, ... subjectConstructParams : any[]){
    //TODO no usable at new version
    //this.subject = new SubjectType(... subjectConstructParams)
  }


  create() : Readonly<U>{
    return Object.freeze(this.subject)
  }


  append(payload: T){
    if(this.payload == null){
      this.payload = payload
    } else if(payload != null) {
      Object.assign(this.payload, payload)
    }
    return this
  }

  clearPayload(payload: T){
    this.payload = null
    return this
  }

  set(attr: string, value: any) : PayloadBuilder<U, T> {
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

export class ArrayPayloadBuilder<U extends PayloadAbility<ArrayPayload>> extends PayloadBuilder<U, ArrayPayload>{

  params(... params : PrimaryType[]){
    if(this.payload == null || this.payload.params == null){
      this.set("params", params)
    } else {
      this.payload.params = [...this.payload.params, ...params]
    }
    return this
  }

  clearParams(){
    if(this.payload != null){
      this.payload.params = []
    }
    return this
  }

  getParams() : PrimaryType[]{
    if(this.payload == null){
      return null
    }
    return this.payload.params
  }
}
