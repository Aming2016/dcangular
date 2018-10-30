import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth.service";
import {appConfig} from "../../../../environments/environment";
@Injectable()
export class LoginGuard implements CanActivate{
  constructor(private authService: AuthService, private router : Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if(route.params["fromPath"]){
      return true
    }
    if(this.authService.authenticated()){
      this.router.navigate([appConfig.homePath])
      return false
    }
    return true
  }

}
