import {Logger} from "../../data/logger/logger.service";
import {UtilService} from "../util.service";
import {NavigationExtras, Router} from "@angular/router";
import {appConfig, keyCloakConfig, wechatConfig} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Subscriber} from "rxjs/Subscriber";
import * as Keycloak from "keycloak-js";
import {KeycloakProfile} from "keycloak-js";
import {Observable} from "rxjs/Rx";
//import * as KeycloakAuthorization from "keycloak-js/dist/keycloak-authz";


@Injectable()
export class AuthService{
  private logger: Logger

  constructor(private util: UtilService) {
    this.logger = util.createLogger(this)
  }

  keycloakInst: Keycloak.KeycloakInstance = Keycloak(keyCloakConfig);
  //keycloakAuth = KeycloakAuthorization(this.keycloakInst)

  init(options?: any): Promise<any> {
    return new Promise((resolve, reject) => {

      this.keycloakInst.init(options)
        .success(() => {
          resolve();
        })
        .error((errorData: any) => {
          reject(errorData);
        });
    });
  }

  authenticated(): boolean {
    return this.keycloakInst.authenticated;
  }

  login() {
    this.keycloakInst.login();
  }

  logout() {
    this.keycloakInst.logout();
  }

  account() {
    this.keycloakInst.accountManagement();
  }

  getToken(): Observable<string> {
    if (this.keycloakInst.token) {
      return Observable.create((su:Subscriber<string>) => {
        this.keycloakInst
          .updateToken(5)
          .success(() => {
            su.next(this.keycloakInst.token)
            su.complete()
          })
          .error((e) => {
            this.logger.error(`retrieved token failed`, e)
            su.error('Failed to refresh token')
            su.complete()
          })
      })
    } else {
      //return null instead of throw error
      return Observable.of(null)
    }
  }

  getAuthorizationHeader(): Observable<string> {
    if(this.authenticated()){
      return this.getToken().map(token => 
        `bearer ${token}`)
    }
    return Observable.of(null)
  }

  hasRole(roles: string | string[]){
    if(typeof roles == "string"){
      return this.keycloakInst.hasRealmRole(roles)
    } else {
      for(let role of roles){
        if(this.hasRole(role)){
          return true
        }
      }
      return false
    }
  }

  get roles():string[]{
    if(this.keycloakInst == null
      || this.keycloakInst.realmAccess == null
      || this.keycloakInst.realmAccess.roles == null){
      return []
    }
    return this.keycloakInst.realmAccess.roles
  }

  get profile() : Observable<KeycloakProfile> {
    if(this.keycloakInst.profile == null){
      return Observable.create((sub => {
        this.keycloakInst.loadUserProfile().success(ub => {
          sub.next(ub)
          sub.complete()
        }).error(e =>{
          sub.error(e)
          sub.complete()
        })
      }))
    }
  }

  navigateToLogin(gotoUrl? : string) {
    // Store the attempted URL for redirecting

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {};
    // Navigate to the login page with extras
    //window.location.href = WeChatUtil.oauthUrl(this.authService.path)
    let loginUri = appConfig.loginPath
    if (this.util.isWeChat()) {
      loginUri = wechatConfig.loginPath
    }

    // let url = this.router.url
    // if(!this.util.isEmpty(gotoUrl)){
    //   url = gotoUrl
    // }
    //
    // this.router.navigate([loginUri, {fromPath: url}], navigationExtras);
  }

  // isAuthenticated() : boolean{
    // return this.authDetail.token != null && (this.authDetail.expireDate > new Date());
  // }

  // private _authDetail : AuthDetail = {} as any
  //
  // set authDetail(detail: AuthDetail){
  //   this._authDetail = detail
  // }
  //
  // get authDetail() : AuthDetail{
  //   return this._authDetail
  // }
}

export interface AuthDetail{
  token : string
  tokenType : "bearer"
  expireDate : Date
  refreshToken : string
  aud: string[]
  userName: string
  scope: string[]
  authorities: string[]
  jti: string
  clientId: string
}

