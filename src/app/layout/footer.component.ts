import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./layout.component.scss'],
  template: `
    <div class="layout-footer clearfix">
      <a href="#">
        <img alt="logo-colored" src="assets/layout/images/logo-colored.png"/>
      </a>
      <span class="footer-text-right">
                <span class="material-icons">copyright</span>
                <span>All Rights Reserved</span>
            </span>
    </div>
  `
})
export class FooterComponent {

}
