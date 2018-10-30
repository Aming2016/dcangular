import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statue'
})
export class StatuePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let prop:string;
    if(args == 'maxLength'){
      if(value.length > 30){
        prop = value.substring(0,30)+'...';
      }
      else{
        prop = value;
      }
    }

    if(args == 'city'){
      if(value == 'beihai'){
        prop = '北海';
      }else if(value == 'nanning'){
        prop = '南宁';
      }
    }

    return prop;
  }

}
