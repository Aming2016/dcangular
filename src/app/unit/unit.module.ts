import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitComponent } from './unit.component';
import {UnitRouting} from "./unit-routing";
import {
  AutoCompleteModule, ButtonModule, CheckboxModule, DataTableModule, DropdownModule, FileUploadModule,
  InputTextareaModule, MultiSelectModule,
  ProgressBarModule,
  SharedModule, TreeModule,
} from "primeng/primeng";
import {HttpClientModule} from "@angular/common/http";
import { AddComponent } from './add/add.component';
import {FormsModule} from "@angular/forms";
// 表单校验
import {CustomFormsModule} from "ng2-validation";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UnitRouting,
    ButtonModule,
    DataTableModule,
    SharedModule,
    HttpClientModule,
    AutoCompleteModule,
    DropdownModule,
    ProgressBarModule,
    CheckboxModule,
    InputTextareaModule,
    FileUploadModule,
    MultiSelectModule,
    CustomFormsModule,
    TreeModule,
  ],
  declarations: [UnitComponent, AddComponent]
})
export class UnitModule { }
