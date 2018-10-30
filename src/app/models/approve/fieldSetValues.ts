export interface FieldSetValues{
  /**
   * 主键id
   */
  fieldSetValueId?:number

  /**
   * field_chk_rules表的id
   */
  fieldChkRuleId?:number;

  /**
   * 下拉值
   */
  setValue?:string;

  /**
   * 显示顺序
   */
  orderNum?:number;

  /**
   * 城市
   */
  scity?:string;

  /**
   * 更新时间
   */
  modifyTime?:Date;
}
