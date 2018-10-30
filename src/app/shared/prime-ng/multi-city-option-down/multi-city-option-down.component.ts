import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ValueAccessorBase} from "../../form/value-accessor-base";
import {UtilService} from "../../../core/util.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectItemWrapper} from "../../../models/prime-ng/select-item-wrapper";
import {CityVo} from "../../../models/global/city-vo";
import {CityParamVo, CommonService} from "../../../empl-service/common.service";

@Component({
  selector: 'app-multi-city-option-down',
  templateUrl: './multi-city-option-down.component.html',
  styleUrls: ['./multi-city-option-down.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MultiCityOptionDownComponent,
    multi: true
  }]
})
export class MultiCityOptionDownComponent extends ValueAccessorBase<string[]> implements OnInit {

  constructor(private util: UtilService, private commonService: CommonService) {
    super(util)
  }
  //城市名称
  @Input()
  cityName = ''
  
  //城市
  @Input()
  city =false

  //非城市
  @Input()
  noCity =false

  //功能模块
  @Input()
  function =false

  @Input()
  width = {'width': '180px'}

  /**
   * 是否全选
   * @type {boolean}
   */
  @Input()
  selectAll =false


  options: SelectItemWrapper<CityVo> []

  @Output() initEmitter = new EventEmitter<boolean>();

  ngOnInit() {
    let params : CityParamVo ={
      cityName: this.cityName,
      city : this.city,
      noCity : this.noCity,
      function : this.function
    }

    this.commonService.getCityListByType(params).map(function (ois: CityVo[]) {
      return ois.map(function (oi) {
        return new SelectItemWrapper<CityVo>(oi, (d: CityVo) => {
          return d.cityName
        }, (d2: CityVo) => {
          return d2.cityPy
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
