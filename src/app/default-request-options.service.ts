import {Injectable, Inject, LOCALE_ID} from "@angular/core";
import {BaseRequestOptions, RequestOptions} from "@angular/http";
import {LoggerService, Logger} from "./data/logger/logger.service";


@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  private logger : Logger
  constructor(private loggerService :LoggerService, @Inject(LOCALE_ID) locale : string){
    super();
    this.logger = loggerService.createLogger(this)

    // Set the default 'Content-Type' header
    this.headers.set('Content-Type', 'application/json');
    // set default language
    this.headers.set('Accept-Language', locale);

    this.logger.debug("set http header with Accept-Language + ", locale)
  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };
