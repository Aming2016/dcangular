import {Component, OnInit, OnDestroy, HostBinding} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {LoggerService, Logger} from "./data/logger/logger.service";
import * as config from "../environments/environment";
import {Scope} from "../utils/util";
import {UtilService} from "./core/util.service";
// const wx = require("jweixin")


@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy{

  showLoading = false
  ngOnInit(): void {
    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: '', // 必填，公众号的唯一标识
    //   timestamp: "", // 必填，生成签名的时间戳
    //   nonceStr: '', // 必填，生成签名的随机串
    //   signature: '',// 必填，签名，见附录1
    //   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // });

    this.route.data.subscribe(data => {
      this.showLoading = data["showLoading"]
    })
    this.printConfig()
  }

  // @HostBinding("class") get parentClass(){
  //   return "flex-container flex-column flex-item app-root"
  // }


  ngOnDestroy(): void {

  }

  private logger : Logger
  constructor(private loggerService :LoggerService, private route : ActivatedRoute){
    this.logger = loggerService.createLogger(this)
  }

  printConfig(){
    this.logger.debug(" <<<<<<<<<<<<<< environment config check >>>>>>>>>>>>>>")
    this.logger.debug("appConfig" ,config.appConfig)
    this.logger.debug("serverConfig" ,config.serverConfig)
    this.logger.debug("parseConfig" ,config.parseConfig)
    this.logger.debug("wechatConfig" ,config.wechatConfig)
    this.logger.debug("debugConfig" ,config.debugConfig)
    this.logger.debug("resourceConfig" ,config.resourceConfig)
    this.logger.debug(" >>>>>>>>>>>>>> environment config check <<<<<<<<<<<<<<")
  }
}
