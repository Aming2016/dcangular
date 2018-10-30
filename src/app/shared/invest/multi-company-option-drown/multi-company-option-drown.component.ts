import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonService} from "../../../empl-service/common.service";
import {UtilService} from "../../../core/util.service";
import {ValueAccessorBase} from "../../form/value-accessor-base";
import {CompanyUnit} from "../../../models/invest/empl-info";
import {SelectItemWrapper} from "../../../models/prime-ng/select-item-wrapper";
import {CompaniesQueryVo} from "../../../models/invest/companies-queryVo";

@Component({
  selector: 'app-multi-company-option-drown',
  templateUrl: './multi-company-option-drown.component.html',
  styleUrls: ['./multi-company-option-drown.component.scss']
})
export class MultiCompanyOptionDrownComponent extends ValueAccessorBase<string[]> implements OnInit{

  constructor(private util: UtilService, private commonService: CommonService) {
    super(util)
  }

  /**
   * 是否全选
   * @type {boolean}
   */
  @Input()
  selectAll =false

  @Input()
  status ='VALID'

  @Input()
  width = {'width': '200px'}

  options: SelectItemWrapper<CompanyUnit> []


  @Output() initEmitter = new EventEmitter<boolean>();


  ngOnInit() {

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
      this.options =v
      if(this.selectAll){
        this.value =[]
        this.options.forEach(i =>{
          this.value.push(i.getId())
        })
      }
      this.initEmitter.emit(true)
    })

  }

}
