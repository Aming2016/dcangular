import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../core/util.service";
import {GlobalDataService} from "../../../data/global-data.service";
import {ValueAccessorBase} from "../../form/value-accessor-base";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {OptionItem} from "../../../models/global/option-item";
import {SelectItemWrapper} from "../../../models/prime-ng/select-item-wrapper";

@Component({
  selector: 'app-option-drop-down',
  templateUrl: './option-drop-down.component.html',
  styleUrls: ['./option-drop-down.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OptionDropDownComponent,
      multi:true
    }
  ]
})
export class OptionDropDownComponent extends ValueAccessorBase<string> implements OnInit {

  constructor(private util: UtilService, private gdata: GlobalDataService) {
    super(util)
  }

  ngOnInit(): void {
  }

  options : Observable<SelectItemWrapper<OptionItem>[]>

  @Input()
  optionType :string;

  @Input()
  optionName :string;

  @Input()
  set cityName(cityName : string ){
      if(cityName!= null){
        this.options = this.gdata.optionsItem(cityName,this.optionName,this.optionType).map((ois : OptionItem[]) => {
          if(ois[0]!=null)
             this.defaultData.emit(ois[0].item.toString());
          return ois.map(oi => {
            return new SelectItemWrapper<OptionItem>(oi, (d : OptionItem) => {
              return d.item
            },(d2 : OptionItem) =>{
              return d2.item
            })
          })
        })
      } else {
        this.options = Observable.empty()
      }
  }

  @Input()
  isId : string

//输出数据至父页面
  @Output() defaultData=new EventEmitter<string>();
}
