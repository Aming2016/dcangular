import {ControlValueAccessor} from "@angular/forms";
import {UtilService} from "../../core/util.service";
import {Logger} from "../../data/logger/logger.service";


export class ValueAccessorBase<T> implements ControlValueAccessor {

  private logger: Logger

  constructor(util: UtilService) {
    this.logger = util.createLogger(this)
  }

  private innerValue: T;


  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();


  get value(): T {
    return this.innerValue;
  }


  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
      this.valueChange(value);
    }
  }

  public valueChange(value : T){

  }

  touch() {
    this.touched.forEach(f => f());
  }


  writeValue(value: T) {
    this.value = value;
  }


  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }


  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}
