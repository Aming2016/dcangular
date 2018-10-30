import {ModuleWithProviders, NgModule} from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
import {UnitComponent} from "./unit.component";
import {AddComponent} from "./add/add.component";


export const routes: Routes = [
  {
    path: '',
    // component: LayoutComponent,
    component:UnitComponent,
    canActivateChild: [],
  },
  {
    path:'add',
    component:AddComponent,
  }
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [
    routing,
  ],
  exports: [
    RouterModule
  ]
})
export class UnitRouting{}
