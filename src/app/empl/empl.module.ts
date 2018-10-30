import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { EmplRoutingModule } from '../empl/empl/empl-routing.module';
import { EmplComponent } from './empl/empl.component';
import { LayoutModule} from "../layout/layout.module";
import { InvestListComponent } from './invest-list/invest-list.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { EmplServiceModule } from "../empl-service/empl-service.module";
import { StockListComponent } from './stock-list/stock-list.component';
import { BatchListComponent } from './batch-list/batch-list.component';
import { RetirementListComponent } from './retirement-list/retirement-list.component';
import { StatementListComponent } from './statement-list/statement-list.component';
@NgModule({
  imports: [
      SharedModule,
      LayoutModule,
      CommonModule,
      EmplRoutingModule,
      EmplServiceModule
  ],
  declarations: [ 
      UserAdminComponent, 
      EmplComponent, 
      InvestListComponent,
      CompanyManagementComponent,
      StockListComponent,
      BatchListComponent, 
      RetirementListComponent, 
      StatementListComponent],
  providers : []
})
export class EmplModule { }
