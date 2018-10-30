import { ModuleWithProviders, NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { LayoutComponent} from "../../layout/layout.component";
import { UserAdminComponent} from "../user-admin/user-admin.component";
import { InvestListComponent } from "../invest-list/invest-list.component";
import { StockListComponent } from "../stock-list/stock-list.component";
import { BatchListComponent } from "../batch-list/batch-list.component";
import { RetirementListComponent } from "../retirement-list/retirement-list.component";
import { CompanyManagementComponent } from "../company-management/company-management.component";
import { StatementListComponent } from "../statement-list/statement-list.component";
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [],
    children: [
      {
        path:'',
        component: UserAdminComponent,
        redirectTo: 'user-admin'
      },
      {
        path: 'user-admin',
        component: UserAdminComponent,
        data : {label:"用户管理"}
      },
      {
        path: 'invest-list',
        component: InvestListComponent,
        data : {label:"投资项管理"}
      },
      {
        path: 'stock-list',
        component: StockListComponent,
        data : {label:"购股申请"}
      },
      {
        path: 'batch-list',
        component: BatchListComponent,
        data : {label:"批量送审"}
      },
      {
        path: 'retirement-list',
        component: RetirementListComponent,
        data : {label:"退股申请"}
      },
      {
        path: 'company-management',
        component: CompanyManagementComponent,
        data : {label:"子公司管理"}
      },
      {
        path: 'statement-list',
        component: StatementListComponent,
        data : {label:"报表"}
      }
    ]
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

export class EmplRoutingModule {
}
