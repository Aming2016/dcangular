import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonService} from "./common.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers : [
    CommonService
  ]
})
export class EmplServiceModule { }
