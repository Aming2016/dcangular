import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  loading = 'none';
  private routeEvent : Subscription;
  constructor(private router: Router) { }

  ngOnInit() {
    this.routeEvent = this.router.events.subscribe(event => {
        if(event instanceof NavigationStart){
          (<NavigationStart>event).url
          console.log("Start event --- url=" + (<NavigationStart>event).toString())
          this.loading = 'block';
        }

        if(event instanceof NavigationEnd){
          console.log("End event --- url=" + (<NavigationEnd>event).toString())
          this.loading = 'none'
        }
    });
  }

  ngOnDestroy(): void {
    console.log("loading destroy ......")
    if(this.routeEvent){
      this.routeEvent.unsubscribe();
      this.routeEvent = null;
      this.loading = 'none';
    }

  }

}
