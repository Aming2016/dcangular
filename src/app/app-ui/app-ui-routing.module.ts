import {ModuleWithProviders, NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginGuard} from "../core/security/guard/login-guard.service";
import {LogoutComponent} from "./logout.component";

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginGuard]
  },{
    path: 'logout', component: LogoutComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [
    routing
  ],
  exports: [
    RouterModule
  ]
})
export class AppUIRoutingModule {}
