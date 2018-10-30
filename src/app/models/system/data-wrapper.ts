export class DataWrapper<T>{
  constructor(public data : T,
              public readLabel: (data:T) => string,
              public readId: (data:T) => string
  ){}

  equal(tn : DataWrapper<T>):boolean{
    if(tn == null){
      return false
    }
    return tn.getId() == this.getId()
  }

  get(attr: string) : any{
    return this.data[attr]
  }

  getId():string {
    return this.readId(this.data)
  }

  get label() : string{
    return this.readLabel(this.data)
  }
}
