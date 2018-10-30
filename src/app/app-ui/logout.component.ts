import {Component, HostBinding, OnInit} from "@angular/core";
import {Router, NavigationExtras, ActivatedRoute} from "@angular/router";
import {AuthService} from "../core/security/auth.service";
import {appConfig} from "../../environments/environment";
import {AuthProtocolService} from "../core/security/auth-protocol.service";

@Component({
  template: ""
})
export class LogoutComponent implements OnInit{
  ngOnInit(): void {
    this.logout()
  }
  message: string;

  name: string = 'admin'
  password: string = 'password'

  constructor(private authPro: AuthProtocolService, private router: Router) {
  }

  logout() {
    this.authPro.logout().subscribe((res) => {
      this.router.navigate([appConfig.homePath])
    });
  }

}
