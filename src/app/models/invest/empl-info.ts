//子公司单元
export interface CompanyUnit{
  id ? : number//公司表id
  companyName ? : string//公司名称
}
//用户
export class EmplInfo{
  id?: number//员工id
  companyName?: string//子公司
  emplName?: string//员工名字
  tel?: string//电话
  sex?: string//性别
  idNo?: string//身份证
  bankName?: string//开户银行
  bankAccount?: string//银行账户
  deptName?: string//部门名称
  positionName?: string//职位
  status?: string//在职状态
  createDateTime?: string//创建时间
  lastUpdateTime?: string//最后修改时间
  birthday?: string//生日
  /**
   * 账号(注意：用户账号从aio中取出，应该把城市号+员工账号，
   存入员工表账号表，因为不同城市之间的账号是重复的)
   */
  emplAcco?: string
}

//新增用户
export class AddOneUser extends EmplInfo{}

//本地日期
export const ch = {
  /** 每周第一天，0代表周日 */
  firstDayOfWeek: 0,
  /** 每周天数正常样式 */
  dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  /** 每周天数短样式（位置较小时显示） */
  dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  /** 每周天数最小样式 */
  dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
  /** 每月月份正常样式 */
  monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  /**每月月份短样式 */
  monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
};

//下拉选项
export interface SelectItem {
  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
}
