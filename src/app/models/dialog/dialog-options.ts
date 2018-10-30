import {Type} from "@angular/core";
import {AsyncSubject} from "rxjs/AsyncSubject";
import {PrimaryType} from "../common-type";
import {PayloadAbility} from "../payload-ability";

export enum DialogResultType{
  approve, deny
}
export enum DialogType {
  info,warn,error
}

export class DialogOptions implements PayloadAbility<Array<PrimaryType>>{

  dialogType:DialogType
  closable: boolean = false
  showApprove: boolean = true
  showDeny: boolean = false
  bodyComponent? : Type<any>
  iconClass? : string
  navParas? : any[] | string
  payload : Array<PrimaryType> = new Array<PrimaryType>()
  result$: AsyncSubject<DialogResultType> = new AsyncSubject<DialogResultType>()


  set(attr: string, value: any) : DialogOptions{
    this.payload[attr] = value
    return this
  }

  get(attr: string): any {
    return this.payload[attr]
  }

}
