export interface PayloadAbility<T>{
  set(attr: string, value : any) : PayloadAbility<T>
  get(attr: string) : any
  payload? : T
}
