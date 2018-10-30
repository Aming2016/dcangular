import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TitleBannerComponent} from "./title-banner/title-banner.component";
import {LoadingComponent} from "./loading/loading.component";
import {RouterModule} from "@angular/router";
import {ResizeCalcDirective} from "./resize-calc.directive";
import {MessagePanelComponent} from "./message-panel/message-panel.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {
  CheckboxModule, DataTableModule, DialogModule, DropdownModule, MegaMenuModule, MenuModule, MultiSelectModule,
  OverlayPanelModule,
  PanelModule, SidebarModule, SliderModule,
  SplitButtonModule, ToolbarModule, TreeModule,
  SharedModule as PrimeSharedModule, CalendarModule, AutoCompleteModule, ChipsModule, ConfirmDialogModule, GrowlModule,
  RadioButtonModule, SpinnerModule, InputTextModule, PaginatorModule, MessagesModule, MenubarModule,
  FileUploadModule, FieldsetModule, MessageModule, DataGridModule, PickListModule, ListboxModule, InputTextareaModule,
  TabMenuModule, TabViewModule, SelectButtonModule, TieredMenu, TieredMenuModule, TooltipModule,TreeNode
} from "primeng/primeng";
import { StatuePipe } from './pipe/statue.pipe';
import { TableModule} from "primeng/table";
import { FieldTypePipe } from './pipe/field-type.pipe';
import { ToastModule} from "primeng/toast";
import { DataViewModule} from "primeng/dataview";
import { TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { MultiCityOptionDownComponent} from "./prime-ng/multi-city-option-down/multi-city-option-down.component";
import { OptionDropDownComponent} from "./prime-ng/option-drop-down/option-drop-down.component";
import { SingeCityOptionDownComponent} from "./prime-ng/singe-city-option-down/singe-city-option-down.component";
import { SingleTreeComponent} from "./prime-ng/single-tree/single-tree.component";
import { SingleCompanyOptionDrownComponent } from './invest/single-company-option-drown/single-company-option-drown.component';
import { MultiCompanyOptionDrownComponent } from './invest/multi-company-option-drown/multi-company-option-drown.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    TreeModule,
    DropdownModule,MultiSelectModule
  ],
  declarations: [TitleBannerComponent,LoadingComponent,
    MessagePanelComponent,
    PaginationComponent,
    ResizeCalcDirective,
    // self defined component
    StatuePipe,
    FieldTypePipe,
    MultiCityOptionDownComponent,
    OptionDropDownComponent,
    SingeCityOptionDownComponent,
    SingleTreeComponent,
    SingleCompanyOptionDrownComponent,
    MultiCompanyOptionDrownComponent,
    
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,// it is allow to exports module which not import
    TitleBannerComponent,LoadingComponent,
    MessagePanelComponent,
    PaginationComponent,
    ResizeCalcDirective,
    // self defined component
    StatuePipe,
    FieldTypePipe,
    // primeNG module export
    PrimeSharedModule,
    SplitButtonModule,
    RadioButtonModule,
    MenuModule,
    DialogModule,
    CheckboxModule,
    PanelModule,
    TabViewModule,
    MegaMenuModule,
    ToolbarModule,
    DataTableModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    TabMenuModule,
    SliderModule,
    SpinnerModule,
    SelectButtonModule,
    MultiSelectModule,
    SidebarModule,
    TreeModule,
    ConfirmDialogModule,
    GrowlModule,
    CalendarModule,
    ChipsModule,
    InputTextModule,
    AutoCompleteModule,
    OverlayPanelModule,
    PaginatorModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    TooltipModule,
    FileUploadModule,
    FieldsetModule,
    DataGridModule,
    PickListModule,
    ListboxModule,
    TieredMenuModule,
    ToastModule,
    DataViewModule,
    MultiCityOptionDownComponent,
    OptionDropDownComponent,
    SingeCityOptionDownComponent,
    SingleTreeComponent,
    TriStateCheckboxModule,
    SingleCompanyOptionDrownComponent,
    MultiCompanyOptionDrownComponent,
  ],
  entryComponents: []
})
export class SharedModule {
}
