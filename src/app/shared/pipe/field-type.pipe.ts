import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldType'
})
export class FieldTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let prop:string;
    if(args == 'type') {//判断校验规则中的类别名称
      value == 0 ? prop = '文本' : (value == 1 ? prop = '数值' : (value == 2 ? prop = '小数' : (value == 3 ? prop = '下拉' : prop = '日期')));
    }
    return prop;
  }

}
