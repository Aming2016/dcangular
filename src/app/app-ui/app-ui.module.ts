import {NgModule, Optional, SkipSelf} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UIComponent} from "./ui.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AppUIRoutingModule} from "./app-ui-routing.module";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {LogoutComponent} from "./logout.component";
import {DialogComponent} from "./dialog/dialog.component";
import {MessagesComponent} from "./dialog/messages/messages.component";
import {ButtonModule, DialogModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppUIRoutingModule,
    DialogModule,
    ButtonModule,
    // FlexLayoutModule.provideBreakPoints([
    //   {mediaQuery:'(max-width: 340px)', alias:"xs"},
    //   {mediaQuery:'(min-width: 340px)', alias:"gt-xs"},
    //   {mediaQuery:'(min-width: 341px) and (max-width: 600px)', alias:"sm"},
    //   {mediaQuery:'(min-width: 600px)', alias:"gt-sm"},
    // ])
  ],
  declarations: [UIComponent,
    DialogComponent, PageNotFoundComponent,
    LoginComponent, LogoutComponent,
    MessagesComponent],
  exports: [UIComponent,
    DialogComponent],
  entryComponents: [MessagesComponent],
})

export class AppUIModule {
  constructor(@Optional() @SkipSelf() parentModule: AppUIModule) {
    if (parentModule) {
      throw new Error(
        'AppUIModule is already loaded. Import it in the AppModule only');
    }
  }
}
