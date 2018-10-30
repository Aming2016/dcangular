import {DataWrapper} from "../system/data-wrapper";
import {SelectItem} from "primeng/primeng";

export class SelectItemWrapper<T> extends DataWrapper<T> implements SelectItem{
  get value():string{
    return this.getId()
  }

  set value(v : string){
    // do not allow set value here, use data to set value
  }
}
