import { Injectable } from '@angular/core';
import {LoggerService, LogLevel, LogConfig} from "./logger.service";

@Injectable()
export class ConsoleLoggerService extends LoggerService{


  constructor(protected loggerConfig : LogConfig) {
    super(loggerConfig)
  }



  private static readonly _methodMap : Map<LogLevel, string> = new Map<LogLevel, string>()
  static consoleMethod(level :LogLevel) : string{
    if(ConsoleLoggerService._methodMap.size == 0){
      ConsoleLoggerService._methodMap.set(LogLevel.DEBUG, "debug")
      ConsoleLoggerService._methodMap.set(LogLevel.INFO, "log")
      ConsoleLoggerService._methodMap.set(LogLevel.WARN, "warn")
      ConsoleLoggerService._methodMap.set(LogLevel.ERROR, "error")
      ConsoleLoggerService._methodMap.set(LogLevel.FATAL, "error")
    }

    return ConsoleLoggerService._methodMap.get(level)
  }

  logWriter(level: LogLevel, module: string | any, ...args: any[]) {
    let consoleMethod = ConsoleLoggerService.consoleMethod(level)

    if(this.loggerConfig.traceEnableLevel >= level){
      consoleMethod = "trace"
    }

    switch(consoleMethod){
      case "debug":
        console.debug("[" + LogLevel[level] + "]", "[" + module + "] ", ... args)
        break;
      case "log":
        console.log("[" + LogLevel[level] + "]", "[" + module + "] ", ... args)
        break;
      case "warn":
        console.warn("[" + LogLevel[level] + "]", "[" + module + "] ", ... args)
        break;
      case "error":
        console.error("[" + LogLevel[level] + "]", "[" + module + "] ", ... args)
        break;
      case "trace":
        console.trace("[" + LogLevel[level] + "]", "[" + module + "] ", ... args)
        break;
      default:
        console.trace("[UNKNOWN]", "[" + module + "] ", ... args)
    }
  }

}
