import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {BreadcrumbService} from "./breadcrumb.service";

@Injectable()
export class BreadcrumbGuard implements CanActivateChild {

  constructor(private bread : BreadcrumbService){

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(childRoute.data != null && childRoute.data.label){
      let {label, icon} = childRoute.data
      this.bread.push(state.url, label, icon)
    }
    return true;
  }

}
