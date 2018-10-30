import 'rxjs/add/operator/do';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {UtilService} from "../util.service";
import {Logger} from "../../data/logger/logger.service";
import {Injectable} from "@angular/core";
import {ResResult} from "../../models/system/response-result";

@Injectable()
export class ResultConverterInterceptor implements HttpInterceptor {
  private logger: Logger

  constructor(private util: UtilService) {
    this.logger = util.createLogger(this)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .map(event => {
        if (event instanceof HttpResponse) {
          if(ResResult.is(event.body)){
            if(event.body.data != null){
              this.convertStringToDate(event.body.data)
              return event.clone({body:event.body.data})
            }
          }
        }
        return event
      });
  }


  convertStringToDate(object : any){
    if(object instanceof Array){
      for(let o of object){
        this.convertStringToDate(o)
      }
    } else {
      for(let f in object){
        if(f.toLowerCase().endsWith("date") || f.toLowerCase().endsWith("time")){
          if(object[f] != null){
            try{
              if(object[f] == ""){
                object[f] = null
              } else {
                object[f] = new Date(object[f])
              }
            } catch(e){
              this.logger.warn("invalid date format: ", object[f])
            }

          }
        }
      }
    }

  }
}

