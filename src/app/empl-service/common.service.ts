import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CityVo} from "../models/global/city-vo";
import {Observable} from "rxjs/Observable";
import {GroupVo} from "../models/global/group-vo";
import {TreeData} from "../models/prime-ng/treeData";
import {investApiConfig} from "../../environments/environment";
import {CompaniesQueryVo} from "../models/invest/companies-queryVo";
import {CompanyUnit} from "../models/invest/empl-info";

@Injectable()
export class CommonService {

  constructor(private http:HttpClient) { }



  //重写所有部门
  deptTreeList(scity:string): Observable<TreeData[]> {
    return this.http.get<TreeData[]>(investApiConfig.url+"dp/deptTreeList",{
      headers : {'Content-Type':'application/json'},
      params : new HttpParams()
        .set('scity', scity)
    })
  }

  //查询所有员工
  listEmplAll(scity:string): Observable<TreeData[]> {
    return this.http.get<TreeData[]>(investApiConfig.url+"ep/employeeTreesByCity",{
      headers : {'Content-Type':'application/json'},
      params : new HttpParams()
        .set('scity', scity) 
    })
  }

  /**
   * 获取城市列表
   * @param {CityParamVo} cityParamVo
   * @returns {Observable<CityVo[]>}
   */
  getCityListByType(cityParamVo : CityParamVo) : Observable<CityVo[]>{
     const body = JSON.stringify(cityParamVo)
      return this.http.post<Array<CityVo>>(investApiConfig.url+'common/cityList',body,{
        headers : {'Content-Type':'application/json'}
    })
  }

  /**
   * ALL:所有组别, JURIS 查询当前用户管辖范围下的组别
   * @param type
   */
  getGroupListByType(scitys : string,type : string) : Observable<GroupVo[]>{
    return this.http.post<Array<GroupVo>>(investApiConfig.url+'report/getGroupList',{},{
      params : new HttpParams().set('scitys',scitys).set('type',type)
    })
  }

  queryCompanyOptions(companiesQueryVo : CompaniesQueryVo){
      const body = JSON.stringify(companiesQueryVo)
      return this.http.post<Array<CompanyUnit>>(investApiConfig.url+'companies/queryOptList',body,{
        headers : {'Content-Type':'application/json'}
      })
  }

}

export interface CityParamVo{
  cityName: string
  city? : boolean
  noCity? : boolean
  function? : boolean
}



