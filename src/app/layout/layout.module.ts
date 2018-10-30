import { NgModule } from '@angular/core';
import {BreadcrumbComponent} from "./breadcrumb.component";
import {TopBarComponent} from "./topbar.component";
import {FooterComponent} from "./footer.component";
import {MenuComponent} from "./menu.component";
import {SharedModule} from "../shared/shared.module";
import {LayoutComponent} from "./layout.component";
import {SubMenuComponent} from "./sub-menu/sub-menu.component";
import {ButtonModule, InputTextModule} from "primeng/primeng";

@NgModule({
  imports: [
    SharedModule,
    InputTextModule
  ],
  exports: [
    LayoutComponent,
    BreadcrumbComponent,
    TopBarComponent,
    FooterComponent,
    MenuComponent,
    SubMenuComponent,
    ButtonModule,
    InputTextModule
  ],
  declarations: [
    LayoutComponent,
    BreadcrumbComponent,
    TopBarComponent,
    FooterComponent,
    MenuComponent,
    SubMenuComponent],
  providers:[
  ]
})
export class LayoutModule { }
