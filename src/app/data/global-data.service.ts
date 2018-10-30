import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {UtilService} from "../core/util.service";
import {Logger} from "./logger/logger.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {OptionClass} from "../models/global/option-class";
import {OptionItem} from "../models/global/option-item";
import {investApiConfig} from "../../environments/environment";

@Injectable()
export class GlobalDataService {

  private logger: Logger

  constructor(private util: UtilService, private http: HttpClient) {
    this.logger = util.createLogger(this)
  }

  options(optType: string): Observable<OptionClass> {
    return this.http.get<OptionClass>(investApiConfig.url+`opt/classes/${optType}`)
  }

  optionsItem(cityName :string,optName: string,optType: string): Observable<OptionItem[]> {
    return this.http.post<OptionItem[]>(investApiConfig.url+`opt/items`,{},{
      params: new HttpParams().set('cityName',cityName).set('optType',optType).set('optName',optName)}
    )
  }

  //获取门店部门列表
  // getOfficeDeptList(cityName : string,expireType : string){
  //   return this.http.post<Office[]>(custApiConfig.url+'reqPayment/officeList',{},
  //     { params: new HttpParams().set('cityName',cityName).set('expireType',expireType)}
  //   )
  // }
}
