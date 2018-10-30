import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
  ComponentFactoryResolver,
  ReflectiveInjector
} from "@angular/core";
import {UIService} from "../../core/ui/ui.service";
import {AsyncSubject} from "rxjs/AsyncSubject";
import {Subscription} from "rxjs/Subscription";
import {DialogOptions, DialogResultType, DialogType} from "../../models/dialog/dialog-options";
import {handleHttpError} from "../../../utils/util";
import {LoggerService, Logger} from "../../data/logger/logger.service";
import {isUndefined} from "util";
import {MessagesComponent} from "./messages/messages.component";
import "rxjs/add/operator/let";

//declare var $: any;

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  private logger : Logger

  constructor(private ui: UIService, private loggerService :LoggerService,
              private resolver: ComponentFactoryResolver, private rootContainer : ViewContainerRef) {
    this.logger = loggerService.createLogger(this)

  }

  subs : Subscription
  ngOnInit() {
    if(this.subs){
      this.ngOnDestroy()
    }
    this.subs = this.ui.dialog$.do(options=>{
      this.logger.debug("get options from dialog stream ", options)
      if(options == null){
        this.modal("hide");
      } else {
        this.openDialog(options)
      }
      return true
    }).let(handleHttpError())
      .subscribe(ret => {
    })
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe()
    }
  }

  options: DialogOptions

  _modalRef : ElementRef
  _modal

  private modal(x){
    this._modal.modal(x)
  }



  @ViewChild("modalFrame") set modalRef(modal : ElementRef){
    this._modalRef = modal
    //this._modal = $(this._modalRef.nativeElement)
  }

  @ViewChild("content", {read:ViewContainerRef})
  content: ViewContainerRef


  onDeny = (result$?:AsyncSubject<DialogResultType>) => {
    return () => {
      if(result$) {
        result$.next(DialogResultType.deny)
      }
      return true
    }
  }

  onApprove = (result$?:AsyncSubject<DialogResultType>) => {
    return () => {
      if(result$){
        result$.next(DialogResultType.approve)
      }
      return true
    }
  }


  // after approve or deny before hidden. dialog box still shown on screen
  onHide = (result$?:AsyncSubject<DialogResultType>) => {
    return () => {
      return true
    }
  }

  // dialog box is completed hidden
  onHidden = (result$?:AsyncSubject<DialogResultType>) => {
    return () => {
      if(result$){
        result$.complete()
      }
    }
  }

  openDialog(options : DialogOptions){

    if(isUndefined(options.showApprove)){
      options.showApprove = true
    }

    if(isUndefined(options.closable)){
      options.closable = false
    }
/*
    let inputProviders = [{provide:'dummy', useValue: 'dummy'}]
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.rootContainer.parentInjector);

    this.content.clear()
    let bodyComponent = options.bodyComponent
    if(bodyComponent != null){
      bodyComponent = MessagesComponent
    }
    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(bodyComponent);


    // We create the component using the factory and the injector
    let contentComponent = factory.create(injector);
    contentComponent.instance["payload"] = options.payload

    this.content.insert(contentComponent.hostView)
    // this.content.createComponent(factory, 0 , injector)

    this.modal({
      blurring: true,
      onApprove: this.onApprove(options.result$),
      onDeny : this.onDeny(options.result$),
      onHidden : this.onHidden(options.result$),
      onHide : this.onHide(options.result$),
      closable: isUndefined(options.closable)?false:options.closable,
      offset: 100
    })
    this.options = options
    this.modal("show")
    this.modal("refresh")
    */

    this.options = options
    this.message = this.options.get("bodyKey")
    this.display = true
  }
  message = ""
  display=false

  navigate(){
    if(this.options.navParas == null){
      return
    }
    if(typeof this.options.navParas === 'string'){
      return [this.options.navParas]
    }
    return this.options.navParas
  }

  iconClass(){
    if(this.options != null && this.options.iconClass == null){
      // [class.info]="false" [class.warning]="true" class="circle icon"
      if(this.options.showApprove && this.options.showDeny){
        return "help circle icon"
      } else {
        switch(this.options.dialogType){
          case DialogType.info:
            return "info circle icon"
          case DialogType.warn:
            return "warning circle icon"
          case DialogType.error:
            return "remove circle icon"
        }
      }
      return null
    } else if (this.options != null){
      return this.options.iconClass
    }
    return null;
  }

  messageClass(){
    if(this.options != null){
      switch(this.options.dialogType){
        case DialogType.info:
          return {}
        case DialogType.warn:
          return {warning: true}
        case DialogType.error:
          return {negative: true}
      }
    }
    return null;
  }

}
