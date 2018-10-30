import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ValueAccessorBase} from "../../form/value-accessor-base";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonService} from "../../../empl-service/common.service";
import {UtilService} from "../../../core/util.service";
import {CompaniesQueryVo} from "../../../models/invest/companies-queryVo";
import {SelectItemWrapper} from "../../../models/prime-ng/select-item-wrapper";
import {CompanyUnit} from "../../../models/invest/empl-info";

@Component({
  selector: 'app-single-company-option-drown',
  templateUrl: './single-company-option-drown.component.html',
  styleUrls: ['./single-company-option-drown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SingleCompanyOptionDrownComponent,
    multi: true
  }]
})

export class SingleCompanyOptionDrownComponent extends ValueAccessorBase<string> implements OnInit {

  constructor(private util: UtilService, private commonService: CommonService) {
      super(util)
  }

  /**
   * 子公司状态
   *VALID 可用
   * DELETE 删除
   */
  @Input()
  status ='VALID'

  @Input()
  width = {'width': '150px'}

  options: SelectItemWrapper<CompanyUnit> []

  @Output() initEmitter = new EventEmitter<boolean>();

  ngOnInit(): void {
    let queryVo : CompaniesQueryVo = {
      status : this.status
    }
    this.commonService.queryCompanyOptions(queryVo).map(function (ois: CompanyUnit[]){
      return ois.map(function (oi) {
        return new SelectItemWrapper<CompanyUnit>(oi, (d: CompanyUnit) => {
          return d.companyName
        }, (d2: CompanyUnit) => {
          return d2.id+''
        })
      })
    }).subscribe(v => {
      console.log(v)
      this.options =v
      this.value = v[0].getId()
      this.initEmitter.emit(true)
    })
  }

}
