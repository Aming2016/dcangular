export enum ColumnDataType{
  string,number,currency,date, datetime
}
export interface ColumnDefine{
  header:string
  field:string
  type?:ColumnDataType,
  format?:string
}


