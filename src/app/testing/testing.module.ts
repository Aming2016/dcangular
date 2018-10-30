import {NgModule, NgZone} from '@angular/core';
import {LogConfig, LoggerService, LogLevel} from "../data/logger/logger.service";
import {ConsoleLoggerService} from "../data/logger/console-logger.service";
import {ExtractResultService} from "../data/extract-result.service";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivatedRouteStub, RouterLinkStubDirective, RouterOutletStubComponent, RouterStub} from "./router-stubs";
import {UIService} from "../core/ui/ui.service";
import {UtilService} from "../core/util.service";
import {AuthService} from "../core/security/auth.service";

@NgModule({
  imports: [
  ],
  declarations: [RouterLinkStubDirective,
    RouterOutletStubComponent],
  exports: [RouterLinkStubDirective, RouterOutletStubComponent],
  providers:[ ExtractResultService,
    UIService,
    UtilService,
    {provide : Router, useClass:RouterStub},
    {provide: ActivatedRoute,  useClass :ActivatedRouteStub},
    {provide : LogConfig, useValue:{logLevel: LogLevel.DEBUG}},
    {provide : LoggerService, useClass:ConsoleLoggerService},
  ],
})
export class TestingModule { }


