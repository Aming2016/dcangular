import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw'

import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {UtilService} from "../util.service";
import {Logger} from "../../data/logger/logger.service";
import {Inject, Injectable} from "@angular/core";
import {AuthService} from "../security/auth.service";
import {ResResult} from "../../models/system/response-result";
import {ResultCode} from "../../models/system/result-code";
import {ERROR_RESULT_HANDLE_TOKEN, ErrorResultHandler} from "./error/error-result-handler";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private logger: Logger

  constructor(private util: UtilService, private auth: AuthService,
              @Inject(ERROR_RESULT_HANDLE_TOKEN) private errHandler: ErrorResultHandler<any>[]) {
    this.logger = util.createLogger(this)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // install an error handler
    return next.handle(req)
      .map(event => {
        if (event instanceof HttpResponse) {
          let body = event.body;
          if (ResResult.is(body)) {
            if (body.status != ResultCode.success) {
              for (let eh of this.errHandler) {
                if (eh.acceptError(body)) {
                  this.util.error(eh.retrieveErrorMessage(body)).open()
                }
              }
              console.log('-----------------'+req.url)
              throw new Error(`error code: ${body.status}, message: ${body.msg}`)
            }
          }
        }
        return event
      }).catch((err: HttpErrorResponse) => {
        this.logger.debug(err);
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401 :
              this.logger.debug("not all access")
              this.util.error("您尚未登录！").open().subscribe(e => {
               this.auth.login()
              })
              break;
            case 403:
              // TODO:
              this.util.error("权限不足").open()
              break;
            default:
              this.util.error("服务器链接异常").open()
          }
        }

        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.logger.debug('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.logger.debug(`Backend returned code ${err.status}, body was:`, err.error);
        }

        // return Observable.throw(new Error('Your custom error'));
        return Observable.throw(err);
      });
  }
}
