import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {MenuItem} from 'primeng/primeng';
import {BreadcrumbService} from "../core/breadcrumb.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./layout.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {
  dblclick(ev){

    this.breadcrumbService.remove(ev.activeItem)
  }
  cities1: any[];

  cities2: any[];
  countries: any[];

  selectedCountry: any;
  selectedCity1: any;

  selectedCity2: any;



    subscription: Subscription;

  items: MenuItem[];
  items2:any

  constructor(public breadcrumbService: BreadcrumbService) {
    this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
      this.items = response.map(rep => {
        //remove icon for tab
        rep.icon = null
        return rep
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
