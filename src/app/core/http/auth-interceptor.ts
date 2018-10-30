import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {AuthService} from "../security/auth.service";
import {Observable} from "rxjs/Observable";
import {UtilService} from "../util.service";
import 'rxjs/add/operator/switchMap';
import {Logger} from "../../data/logger/logger.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private logger: Logger

  constructor(private util: UtilService,
              private auth: AuthService) {
    this.logger = util.createLogger(this)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Pass on the cloned request instead of the original request.
    return this.auth.getAuthorizationHeader().catch(e => {
      this.logger.error(e)
      return Observable.of(null)
    }).switchMap(authHeader => {
      let authReq = req;
      if(authHeader) {
        // Get the auth header from the service.
        // Clone the request to add the new header.
        authReq = req.clone({setHeaders: {Authorization: authHeader}});
      }
      return next.handle(authReq)
    })
  }
}
