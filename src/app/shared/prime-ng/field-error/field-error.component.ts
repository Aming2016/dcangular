import {Component, Host, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, NgForm} from "@angular/forms";
import {UtilService} from "../../../core/util.service";
import {Logger} from "../../../data/logger/logger.service";

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit {

  private logger: Logger

  constructor(private util: UtilService, @ViewChild(NgForm) private form: NgForm ) {
    this.logger = util.createLogger(this)
  }

  ngOnInit() {

  }

  @HostBinding('class.ui-message')
  @HostBinding('class.ui-messages-error')
  @HostBinding('class.ui-corner-all')
  isError: boolean = true

  // @ViewChild(NgForm)
  // form: NgForm

  @Input()
  path: string

  _fieldLabel: string

  @Input()
  set fieldLabel(label: string) {
    this._fieldLabel = label
  }

  get fieldLabel(): string {
    return this._fieldLabel || ""
  }

  get fieldErrors() {
    let ctrl: AbstractControl = this.getControl()
    if(ctrl == null){
      return null
    }
    return ctrl.errors
  }


  getControl(path: string | string[] = this.path, parentControl: {
    controls: {
      [key: string]: AbstractControl;
    }
  } = this.form) {
    if(this.form == null ){
      return null
    }
    if(path == null){
      return null
    }
    if (typeof path == 'string') {
      return this.getControl(path.split("."), parentControl)
    } else {
      if (path.length == 1) {
        return this.form.controls[path[0]]
      }
      let pc = this.form.controls[path.splice(0, 1)[0]]
      if (pc instanceof FormGroup) {
        return this.getControl(path, pc)
      }

      throw new Error("invalid form path ")
    }

  }
}
