import {Component, OnInit, HostListener} from "@angular/core";
import {UIService} from "../core/ui/ui.service";

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UIComponent implements OnInit {

  constructor(private ui : UIService) { }

  ngOnInit() {
    this.onResize()
  }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this.ui.windowResize({"width": window.innerWidth,
      "height": window.innerHeight})
  }
}
