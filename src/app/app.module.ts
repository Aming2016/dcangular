import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.module";
import {AppRoutingModule} from "./app-routing.module";
import {appConfig, debugConfig, resourceHost} from "../environments/environment";
import {DataModule} from "./data/data.module";
import {AppUIModule} from "./app-ui/app-ui.module";
import {requestOptionsProvider} from "./default-request-options.service";
import {TieredMenuModule} from 'primeng/tieredmenu';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(appConfig.defaultLanguage),
    AppRoutingModule, // put App routing module to the 1st routing module
    DataModule.forRoot(
      debugConfig, resourceHost),
    AppUIModule, // ui module container default page not found routing
    TieredMenuModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [ requestOptionsProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}


Array.prototype.swap = function (a: number, b: number) {
  if (a < 0 || a >= this.length || b < 0 || b >= this.length) {
    return
  }

  const temp = this[a];
  this[a] = this[b];
  this[b] = temp;
}

declare global {
  interface Array<T> {
    swap(a: number, b: number): void;
  }
}
