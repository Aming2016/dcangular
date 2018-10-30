import {HttpParams} from "@angular/common/http";

export class Pageable{
  constructor(public page : number = 0, public size : number = 10, public sort? : Sort  ){
  }

  toParams(): HttpParams {
    let params : HttpParams = new HttpParams()
    params=params.append("page", this.page + "")
      .append("size", this.size + "")

    if(this.sort != null){
      for(let o of this.sort.orders){
        params = params.append("sort", o.property + "," + o.direction)
      }
    }
    return params

  }
}


export class Sort{
  constructor(public orders : Order[] = []){
  }

}

export class Order{
  constructor(public property, public direction : Direction = Direction.ASC){

  }
}

export enum Direction{
  ASC="asc", DESC="desc"
}
