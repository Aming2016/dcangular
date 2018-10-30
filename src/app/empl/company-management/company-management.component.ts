import {Component, OnInit, Input} from '@angular/core';
import {ColumnDataType, ColumnDefine} from '../../models/system/column-define'
import {ConfirmationService} from 'primeng/api';
import {EmplInfo, CompanyUnit, AddOneUser, ch, SelectItem} from "../../models/invest/empl-info";
import { getRangeDate } from "../../../utils/util";

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss']
})
export class CompanyManagementComponent implements OnInit {
  noData: boolean = false;//没有数据
  noStockListData: any[] = [//股票数据
    {id: 1},
    {id: 2},
    {id: 3},
  ];
  itemValue: number = 1;//选中项目
  monthsValue: number = 1;//选中分红月份
  moneyValue: number = 1;//分红
  dataValue: number = 1;//创建日期
  investStatusValue: number = 1;//投资状态
  // 投资项目
  item: SelectItem[] = [
    {label: '项目一', value: 1},
    {label: '项目二', value: 2},
  ]
  // 分红月份
  months: SelectItem[] = [
    {label: '月份一', value: 1},
    {label: '月份二', value: 2},
  ]
  // 分红
  money: SelectItem[] = [
    {label: '100元', value: 1},
    {label: '200元', value: 2},
  ]
  // 创建日期
  creatDate: SelectItem[] = [
    {label: '12月1日', value: 1},
    {label: '12月2日', value: 2},
  ]
  // 投资状态
  investStatus: SelectItem[] = [
    {label: '投资中', value: 1},
    {label: '投资进行时', value: 2},
  ]

  isDisplayOne: boolean = false;//新增
  isDisplayTwo: boolean = false;//分红
  isDisplayThree: boolean = false;//投资人
  isDisplayFour: boolean = false;//投资项目
  isDisplayFive: boolean = false;//设置流程
  isDisplaySix: boolean = false;//附件
  isDisplaySeven: boolean = false;//撤销申请

  users: EmplInfo[];//用户列表
  ColumnDataType = ColumnDataType
  selectedUser : any[]//选中的用户
  ch: any = ch;//生日汉化

  // 在职状态
  isJobing: SelectItem[] = [
    {label:'在职',value:''},
    {label:'离职',value:''}
  ]
  
  cols: ColumnDefine[] = [//表头
    {header: "文件名", field: "companyName"},
    {header: "文件类型", field: "emplName"},
  ]
  
  constructor(private confirmationService: ConfirmationService) {
    
  }
  ngOnInit() {   
    //表体
    this.users = [{
        id: 111,
        companyName :'世华易居',
        emplName : '张三',
        tel: '123456',
        status: '离职'
    },{
      id: 222,      
      companyName :'世华易居',
      emplName : '张四',
      tel: '123456',
      status:'在职'
    },{
      id: 333,      
      companyName :'世华易居',
      emplName : '张五',
      tel: '123456',
      status:'在职'
    },{
      id: 444,
      companyName :'世华易居',
      emplName : '张六',
      tel: '123456',
      status:'在职'
    }]
  };

  
  // 单删 股票
  deleteStock() {
    this.confirmationService.confirm({
        message: '是否删除选中项?',
        accept: () => {
          this.selectedUser.forEach(item=>{
            let index = this.users.findIndex(item2=>{
              return item2.id == item.id;
            })
            this.users.splice(index,1);
            if(!this.users.length){
              this.noData = true;
            }
          })
        }
    });
  };
  // 单删 分红
  deleteMoney() {

  }
  
  // 取消对话框
  cancelDialog() {
    this.isDisplayOne = false;
  };
  
  // 保存
  confirmSave() {
    let newUser = new AddOneUser();
    //获取当前的时间搓
    newUser.createDateTime = getRangeDate();
    this.users.push(newUser);
    this.cancelDialog();
  };

  // 提交申请
  commitApply() {

  }

  // 弹窗
  openDialog(type) {
    switch(type){
      case 'addContent': this.isDisplayOne=true;break;//新增内容
      case 'money': this.isDisplayTwo=true;break;//分红
      case 'investor': this.isDisplayThree=true;break;//投资人
      case 'investment': this.isDisplayFour=true;break;//投资项目
      case 'process': this.isDisplayFive=true;break;//设置流程
      case 'attachment': this.isDisplaySix=true;break;//附件
      case 'revocation': this.isDisplaySeven=true;break;//撤销申请
    }
  }  
  
}




