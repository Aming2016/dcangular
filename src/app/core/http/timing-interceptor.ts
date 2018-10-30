import 'rxjs/add/operator/do';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {UtilService} from "../util.service";
import {Logger} from "../../data/logger/logger.service";
import {Injectable} from "@angular/core";

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  private logger: Logger

  constructor(private util: UtilService) {
    this.logger = util.createLogger(this)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next
      .handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          this.logger.debug(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      });
  }
}
