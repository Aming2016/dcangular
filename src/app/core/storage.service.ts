import {Injectable} from '@angular/core';
import {UtilService} from "./util.service";
import {Logger, LogLevel} from "../data/logger/logger.service";
import {AuthService} from "./security/auth.service";

@Injectable()
export class StorageService {

  private logger: Logger

  constructor(private util: UtilService, private auth : AuthService) {
    this.logger = util.createLogger(this)
  }

  checkStorage(){
    if(this.logger.logLevel == LogLevel.DEBUG){
      this.logger.debug("Check Storage values in debug level ++++++++++ START")
      for(let i = 0; i < localStorage.length; i ++){
        this.logger.debug(`  localStorage@[${i}] = [${localStorage.key(i)}, ${localStorage.getItem(localStorage.key(i))}]`)
      }

      for(let i = 0; i < sessionStorage.length; i ++){
        this.logger.debug(`    sessionStorage@[${i}] = [${sessionStorage.key(i)}, ${sessionStorage.getItem(sessionStorage.key(i))}]`)
      }
      this.logger.debug("Check Storage values in debug level ---------- END")
    }
  }

  put(key: string, data: any, session = false) {

    let dataStr: string = this.util.isString(data) ? data : JSON.stringify(data)
    this.logger.debug(`save [${dataStr}] to ${session ? "session" : "local"}Storage with key [${key}]`)
    if (session) {
      sessionStorage.setItem(key, dataStr)
    } else {
      localStorage.setItem(key, dataStr)
    }

    this.checkStorage()
  }

  userPut(key: string, data: any, session = false){
    this.put(key + "|" + this.auth.keycloakInst.subject, data, session);
  }


  userGetRaw<T>(key: string, session = false) : string {
    return this.getRaw(key + "|" + this.auth.keycloakInst.subject, session)
  }
  getRaw(key: string, session = false):string{
    let dataStr = ""
    if(session){
      dataStr = sessionStorage.getItem(key)
    } else {
      dataStr = localStorage.getItem(key)
    }
    this.logger.debug(`get [${dataStr}] from ${session?"session":"local"}Storage with key [${key}]` )
    this.checkStorage()

    return dataStr
  }

  userGet<T>(key: string, session = false) : T {
    return this.get(key + "|" + this.auth.keycloakInst.subject, session)
  }
  get<T>(key: string, session = false) : T {
    return JSON.parse(this.getRaw(key, session))
  }

  getBoolean(key: string, session = false) : boolean {
    let raw = this.getRaw(key, session);
    return !!raw && raw != 'false'
  }

  getNumber(key: string, session = false) : number {
    let raw = this.getRaw(key, session);
    return +raw
  }

  getDate(key: string, session = false) : Date {
    let raw = this.getRaw(key, session);
    return new Date(raw)
  }

  remove(key: string, session = false){
    localStorage.removeItem(key)
    if(session){
      sessionStorage.removeItem(key)
    } else {
      localStorage.removeItem(key)
    }
    this.checkStorage()
  }

  clear(session : boolean = false){
    if(session){
      sessionStorage.clear()
    } else {
      localStorage.clear()
    }
  }

  set layoutStatic(val : boolean){
      this.put("theme.layoutStatic", val)
  }

  get layoutStatic() : boolean{
    return this.getBoolean("theme.layoutStatic")
  }

  set darkMenu(val : boolean){
      this.put("theme.darkMenu", val)
  }

  get darkMenu() : boolean{
    return this.getBoolean("theme.darkMenu")
  }

  set sidebarActive(val : boolean){
      this.put("theme.sidebarActive", val, true)
  }

  get sidebarActive() : boolean{
    return this.getBoolean("theme.sidebarActive", true)
  }

  set mobileMenuActive(val : boolean){
      this.put("theme.mobileMenuActive", val, true)
  }

  get mobileMenuActive() : boolean{
    return this.getBoolean("theme.mobileMenuActive", true)
  }

  set isRTL(val : boolean){
      this.put("theme.isRTL", val)
  }

  get isRTL() : boolean{
    return this.getBoolean("theme.isRTL")
  }

}
