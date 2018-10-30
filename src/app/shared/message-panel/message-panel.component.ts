import {Component, OnInit, OnDestroy} from "@angular/core";
import {UIService} from "../../core/ui/ui.service";
import {Subscription} from "rxjs/Subscription";
import {BusinessError} from "../../models/error/business-error";
import {MsgCode} from "../../models/dialog/msg-code";

@Component({
  selector: 'app-message-panel',
  templateUrl: 'message-panel.component.html',
  styleUrls: ['message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit, OnDestroy {

  constructor(private ui: UIService) { }

  subs : Subscription
  error
  message
  keys = MsgCode
  ngOnInit() {
    if(this.subs){
      this.ngOnDestroy()
    }
    this.subs = this.ui.messagePanel$.subscribe((msg) => {
      this.error = null
      this.message = null
      if(null){
        return
      }
      if(msg instanceof BusinessError){
        this.error = msg
      } else {
        this.message = msg
      }
    })
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe()
    }
  }
}
