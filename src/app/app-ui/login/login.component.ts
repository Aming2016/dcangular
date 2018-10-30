import {Component, HostBinding} from "@angular/core";
import {Router, NavigationExtras, ActivatedRoute} from "@angular/router";
import {AuthService} from "../../core/security/auth.service";
import {Logger, LoggerService} from "../../data/logger/logger.service";
import {AuthProtocolService} from "../../core/security/auth-protocol.service";
import {appConfig} from "../../../environments/environment";
import {BusinessError} from "../../models/error/business-error";

@Component({
  templateUrl: "./login.html"
})
export class LoginComponent {
  message: string;

  @HostBinding("class") get parentClass() {
    return "ui middle aligned center aligned grid"
  }

  @HostBinding("style.height") get parentStyle() {
    return "100%"
  }

  name: string = ''
  password: string = ''
  private logger : Logger

  constructor(private authPro: AuthProtocolService,
              private auth : AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private loggerService :LoggerService) {
    this.logger = loggerService.createLogger(this)
  }



  login(name: string, password: string) {
    this.message = 'Trying to log in ...';

    this.authPro.login({username:name, password:password}).subscribe((data: any) => {
      if (this.auth.authenticated()) {
        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        };

        let fromPath = this.route.snapshot.params["fromPath"] || appConfig.homePath

        // Redirect the user
        this.router.navigate([fromPath], navigationExtras);
      } else {
        this.logger.fatal("unknown reason login failed")
      }
    }, (error: any) => {
      if (error instanceof BusinessError) {

      } else {
        this.logger.fatal("login raise error", error)
      }
    });
  }

  logout() {
    this.authPro.logout();
  }
}
