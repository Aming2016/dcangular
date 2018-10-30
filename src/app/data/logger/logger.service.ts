import { Injectable } from '@angular/core';


export enum LogLevel {
  DEBUG, INFO, WARN, ERROR, FATAL
}

export class LogConfig{
  constructor(
  public logLevel: LogLevel,
  public logServer?: string,
  public traceEnableLevel? : LogLevel){}
}

export abstract class LoggerService {

  constructor(protected logConfig : LogConfig) {
  }

  set logLevel(level: LogLevel){
    this.logConfig.logLevel = level
  }

  get logLevel(){
    return  LogLevel.INFO;
  }

  abstract logWriter(level : LogLevel, module : string, ... args : any[] )

  private innerLogWriter(level : LogLevel, module:string | any, ... args : any[] ){
    if(level >= this.logLevel){
      if(typeof module !== "string"){
        module = module.constructor.name
      }
      this.logWriter(level, module, ... args)
    }
  }

  createLogger(module : string | any) : Logger{
    return new Logger(this, module)
  }

  debug(module:string | any, ... args : any[]){
    this.innerLogWriter(LogLevel.DEBUG, module, ...args)
  }
  info(module:string | any, ... args : any[]){
    this.innerLogWriter(LogLevel.INFO, module, ...args)
  }
  warn(module:string | any, ... args : any[]){
    this.innerLogWriter(LogLevel.WARN, module, ...args)
  }
  error(module:string | any, ... args : any[]){
    this.innerLogWriter(LogLevel.ERROR, module, ...args)
  }
  fatal(module:string | any, ... args : any[]){
    this.innerLogWriter(LogLevel.FATAL, module, ...args)
  }

}

export class Logger{
  constructor(private logService: LoggerService, private module:any){
  }

  debug(... args : any[]){
    this.logService.debug(this.module, ...args)
  }
  info(... args : any[]){
    this.logService.info(this.module, ...args)
  }
  warn(... args : any[]){
    this.logService.warn(this.module, ...args)
  }
  error(... args : any[]){
    this.logService.error(this.module, ...args)
  }
  fatal(... args : any[]){
    this.logService.fatal(this.module, ...args)
  }

  set logLevel(level: LogLevel){
    this.logService.logLevel = level
  }

  get logLevel(){
    return this.logService.logLevel
  }
}
