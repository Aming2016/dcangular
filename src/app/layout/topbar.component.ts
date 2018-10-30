import {Component, OnInit} from '@angular/core';
import {LayoutComponent} from "./layout.component";
import {AuthService} from "../core/security/auth.service";
import {MenuItem} from "primeng/api";
import {BreadcrumbService} from "../core/breadcrumb.service";
import {imgUrl} from "../../environments/environment";
import "rxjs/add/operator/filter";

@Component({
    selector: 'app-topbar',
    styleUrls: ['./layout.component.scss'],
    templateUrl: './topbar.component.html'
})
export class TopBarComponent implements OnInit {
  items: MenuItem[];
  isStared : boolean;

  imgUrl:any = imgUrl.url;

  public unreadMsgCount : number = 0
  ngOnInit() {

    this.bread.favItemsHandler.subscribe(items => {
      this.items = items
    })
    this.bread.currentItemHandler.subscribe(itm => {
      this.isStared = itm.stared;
    })
  }

    userName:string = '';
    img:string = '';

    constructor(public layout : LayoutComponent,
                public authService: AuthService,
                private bread: BreadcrumbService) {

    }


    /**
     * 退出登陆
     */
    logoOut(){
        this.authService.logout();
    }

  addFav(){
      this.bread.starMenu()
  }
}
