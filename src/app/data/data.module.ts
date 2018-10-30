import {NgModule, SkipSelf, Optional, ModuleWithProviders, NgZone} from "@angular/core";
import {ExtractResultService} from "./extract-result.service";
import {LoggerService, LogConfig} from "./logger/logger.service";
import {ConsoleLoggerService} from "./logger/console-logger.service";
import {GlobalDataService} from "./global-data.service";
import {ResourceServer} from "./resource/resource-server";


@NgModule({
  imports: [
  ],
  providers:[
    ExtractResultService,
    GlobalDataService,
    {provide:LoggerService, useClass: ConsoleLoggerService}
    ]
})
export class DataModule {
  constructor(@Optional() @SkipSelf() parentModule: DataModule) {
    if (parentModule) {
      throw new Error(
        'DataModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(loggerConfig: LogConfig, resServer :ResourceServer): ModuleWithProviders {
    return {
      ngModule: DataModule,
      providers: [
        {provide: LogConfig, useValue: loggerConfig},
        {provide: ResourceServer, useValue: resServer}
      ]
    };
  }
}
