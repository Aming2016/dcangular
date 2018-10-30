import {Injectable} from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route
} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth.service";
import {UtilService} from "../../util.service";
import {Logger} from "../../../data/logger/logger.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private logger: Logger

  constructor(private util: UtilService, private auth: AuthService) {
    this.logger = util.createLogger(this)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    let isAuth = this.auth.authenticated()
    if (!isAuth) {
      this.auth.login()
    } else if (route.data["roles"]) {
      if (!this.auth.hasRole(route.data["roles"])) {
        this.util.info("权限不足!").open()
        return false
      }
    }
    return isAuth;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    let url = `/${route.path}`;
    let isAuth = this.auth.authenticated()
    if (!isAuth) {
      this.auth.login()
    }
    return isAuth;
  }

  checkRole() {

  }
}

