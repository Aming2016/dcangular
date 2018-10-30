import {APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {AuthService} from "./security/auth.service";
import {UIService} from "./ui/ui.service";
import {LoginGuard} from "./security/guard/login-guard.service";
import {AuthGuard} from "./security/guard/auth-guard.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UtilService} from "./util.service";
import {WeChatService} from "./we-chat.service";
import {StorageService} from "./storage.service";
import {BreadcrumbService} from "./breadcrumb.service";
import {AuthInterceptor} from "./http/auth-interceptor";
import {TimingInterceptor} from "./http/timing-interceptor";
import {ErrorInterceptor} from "./http/error-interceptor";
import {ERROR_RESULT_HANDLE_TOKEN} from "./http/error/error-result-handler";
import {ResultConverterInterceptor} from "./http/result-converter-interceptor";
import {UnknownErrorHandler} from "./http/error/unknown-error-handler";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {ConfirmationService} from "primeng/api";
import {MessageService} from "primeng/components/common/messageservice";
import {BreadcrumbGuard} from "./breadcrumb.guard";
import {CustomReuseStrategy, RouteReuseConfig} from "./CustomReuseStrategy";
import {RouteReuseStrategy} from "@angular/router";
// import {routeReuseStrategy} from "../../environments/environment";

export function initAuthService(as) {
  return () => as.init({onLoad: 'check-sso', checkLoginIframeInterval: 1})
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [UIService,
    // {provide: AuthProtocolService, useClass: OAuth2ProtocolService},
    UtilService,
    WeChatService,
    AuthGuard,
    LoginGuard,
    StorageService,
    AuthService,
    BreadcrumbGuard,
    BreadcrumbService,
    MessageService,
    ConfirmationService,
  ]
})


export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(locale = "zh-CN"): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: RouteReuseConfig, useValue: RouteReuseStrategy},
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy, deps: [UtilService, RouteReuseConfig] },
        {
          'provide': APP_INITIALIZER,
          'useFactory': initAuthService,
          'deps': [AuthService],
          'multi': true
        },
        {provide: LOCALE_ID, useValue: locale},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }, {
          provide: HTTP_INTERCEPTORS,
          useClass: TimingInterceptor,
          multi: true
        },
        // following interceptors are post request run, so interceptors should insert in reverse order
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ResultConverterInterceptor,
          multi: true
        }, {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }, {
          provide: ERROR_RESULT_HANDLE_TOKEN,
          useClass: UnknownErrorHandler,
          multi: true
        },
        DatePipe,
        CurrencyPipe
      ]
    };
  }

}
