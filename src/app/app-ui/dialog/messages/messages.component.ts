import {Component, OnInit} from "@angular/core";
import {MsgCode} from "../../../models/dialog/msg-code";
import {PrimaryType} from "../../../models/common-type";

@Component({
  selector: 'app-dialog-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }

  payload : Array<PrimaryType> = []
  keys = MsgCode

  switchKey(){
    return this.payload["bodyKey"]
  }
  get message(){
    return this.payload["bodyKey"]
  }
}


