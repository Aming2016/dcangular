import {Injectable, Type} from "@angular/core";
import {Logger, LoggerService} from "../data/logger/logger.service";
import {IllegalArgumentError} from "../models/error/illegal-argument-error";
import {UIService} from "./ui/ui.service";
import {MsgCode} from "../models/dialog/msg-code";
import "rxjs/add/operator/map";
import "rxjs/add/operator/combineLatest";
import * as moment from "moment"
import {Order, Pageable, Sort} from "../models/system/Pageable";

export interface SortOption {
  dir?: "asc" | "desc"
  reader? : (obj : any) => any
  comparator?: ((left :any , right :any) => number)
}

@Injectable()
export class UtilService {

  private logger: Logger

  constructor(private loggerService: LoggerService, private ui: UIService) {
    this.logger = loggerService.createLogger(this)
  }


  // Truth Table
  // Input A	Input B		Output Q
  // 0	      0		      1
  // 0	      1		      0
  // 1	      0		      0
  // 1	      1		      1
  xor(a, b) {
    return ( a || b ) && !( a && b );
  }

  isIterable(obj, raiseError = false): boolean {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    let result = typeof obj[Symbol.iterator] === 'function'
    if (!result) {
      this.logger.warn("illegal argument, input value is not iterable", obj)
      if (raiseError) {
        throw IllegalArgumentError.create("only allow iterable", obj)
      }
    }
    return result
  }

  hasToString(obj): boolean {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    let result = typeof obj['toString'] === 'function'
    if (!result) {
      this.logger.warn("object cannot to String", obj)
    }
    return result
  }

  createLogger(module: any) {
    return this.loggerService.createLogger(module)
  }

  info(message: string|MsgCode, payload?: any) {
    return this.ui.info(message, payload)
  }

  warn(message: string|MsgCode, payload?: any) {
    return this.ui.warn(message, payload)
  }

  error(message: string|MsgCode, payload?: any) {
    return this.ui.error(message, payload)
  }


  toString(obj: any) {
    if (obj == null) {
      return "null"
    } else if (this.hasToString(obj)) {
      return obj.toString()
    } else {
      return JSON.stringify(obj)
    }
  }



  /**
   * sort array according sort options
   * TODO Some Browser implement sort unstable some are stable. unstable sort may cause some problem
   * @param value
   * @param options
   * @returns {any}
   */
  sort(value: Array<any>, {reader, comparator, dir}: SortOption): Array<any> {
    if (value == null) {
      return null
    }
    if (comparator != null) {
      value.sort(comparator)
    // } else if (options != null) {
    //   let norOpt: SortOption[] = []
    //   if (options instanceof Array) {
    //     for (let option of options) {
    //       if (typeof option == "string") {
    //         norOpt.unshift({propPath: option, dir: "asc"})
    //       } else {
    //         norOpt.unshift(option)
    //       }
    //     }
    //   } else {
    //     if (typeof options == "string") {
    //       norOpt.unshift({propPath: options, dir: "asc"})
    //     } else {
    //       norOpt.unshift(options)
    //     }
    //   }
    //
    //   for (let option of norOpt) {
    //     value.sort(this.defaultComparator(option))
    //   }
    } else {
      value.sort(this.defaultComparator({reader, comparator, dir}))
    }
    return value;
  }

  private defaultComparator({reader, dir}: SortOption) {
    return (left: any, right: any) => {
      let a = left
      let b = right;

      let asc = true
      if (reader) {
          a = reader(left)
          b = reader(right)
        asc = dir != "desc"
      }

      let result = 0
      if (typeof a == 'string' && typeof b == 'string') {
        result = a.localeCompare(b)
      } else if (typeof a == 'number' && typeof b == 'number') {
        result = a - b
      } else if ((a instanceof Date) && (b instanceof Date)) {
        result = a.getTime() - b.getTime()
      } else if (this.hasToString(a) && this.hasToString(b)) {
        result = a.toString().localeCompare(b.toString())
      } else {
        result = JSON.stringify(a).localeCompare(JSON.stringify(b))
      }
      if (asc) {
        return result
      } else {
        return result * -1
      }
    }
  }

  instanceOfArray(value: any, type: Type<any>) {
    if (value instanceof Array) {
      for (let row of value) {
        if (!(value instanceof type)) {
          return false
        }
      }
      return true
    }
    return false;
  }


  isString(data : any) : data is string{
    return typeof data == "string"
  }

  isBool(data : any) : data is boolean{
    return typeof data == "boolean"
  }
  isNum(data : any) : data is number{
    return typeof data == "number"
  }

  isEmpty(data : string) : boolean{
    if(data == null){
      return true
    }

    if(this.isString(data)){
      return data.trim().length == 0
    }
  }

  // TODO check replacement of combineLatest
  // combineObservables(obsArr : Observable<boolean>[]) : Observable<boolean>{
  //   if(obsArr == null || obsArr.length == 0){
  //     return Observable.of(false)
  //   } else {
  //     return Observable.combineLatest(obsArr).map(result => {
  //       return result.indexOf(false) < 0
  //     })
  //   }
  // }


  isWeChat(){
    const isWeChat = window.navigator.userAgent.match(/MicroMessenger/i) != null;
    this.logger.debug(` isWeChat === ${isWeChat}`)
    return
  }

  clearCookie(){
    this.logger.debug(" Cookie has been cleared ......")
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
  }

  cvtDate(field : string, inArray = false){
  return (data) => {
    if(inArray){
      for(let i in data){
        data[i][field] = new Date(data[i][field])
      }
    } else {
      data[field] = new Date(data[field])
    }
    return data
  }
}

  getCurrentDate() : string{
    return moment().format("YYYY-MM-DD")
  }

  pageable(page: number, size : number, sort? :Sort ){
    return new Pageable(page,size, sort)
  }
}


