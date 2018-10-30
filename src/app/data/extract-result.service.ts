import {Injectable} from "@angular/core";
import {LoggerService, Logger} from "./logger/logger.service";

@Injectable()
export class ExtractResultService {

  logger : Logger
  constructor(private loggerService : LoggerService) {
    this.logger = loggerService.createLogger(this)
  }


}
