import {ModuleWithProviders, NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./core/security/guard/auth-guard.service";
import {BreadcrumbGuard} from "./core/breadcrumb.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/empl',
    pathMatch: 'full'
  },
  {
    path: 'empl',
    loadChildren:  './empl/empl.module#EmplModule',
    canActivateChild: [BreadcrumbGuard],
    canActivate:[AuthGuard]
  }
];

const routing: ModuleWithProviders = RouterModule.forRoot(routes,
  {useHash: false, preloadingStrategy: PreloadAllModules }
  );


@NgModule({
  imports: [
    routing
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
