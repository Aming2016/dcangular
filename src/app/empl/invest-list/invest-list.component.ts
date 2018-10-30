import { Component, OnInit } from '@angular/core';
import { EmplInfo, ch ,SelectItem} from '../../models/invest/empl-info';
import { ColumnDefine } from '../../models/system/column-define'
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-invest-list',
  templateUrl: './invest-list.component.html',
  styleUrls: ['./invest-list.component.scss']
})
export class InvestListComponent implements OnInit {
  constructor(private confirmationService: ConfirmationService) {

  };
  noUserData: boolean = false;//没有数据
  ch: any = ch;//生日汉化
  isDisplay = false;
  isDisplaybox = false;
  isDisplaytwobox = false;
  isDisplayfourbox = false;
  isDisplayaffix = false;//附件
  beginbirthday = "";// 购买起始时间
  overbirthday = "";//购买结束时间
  selectedCity2:number= 2;//智能查询；
  selectedCity3:number = 3;//状态
  selectedUser: any[]//选中的用户
  users: EmplInfo[];//用户列表
  cities1: SelectItem[] = [
    { label: '公司一', value:6 },
    { label: '公司二', value:1},
    { label: '公司三', value:2},
    { label: '公司四', value:3 },
    { label: '公司5', value:4},
    { label: '公司6', value:5}];;//所属分公司
  selectedCity1:number = 4;
  //查询
  inquirebtn(){
    console.log(this.selectedCity2)
    console.log(this.selectedCity1)
    console.log(this.selectedCity3)
    console.log(this.beginbirthday)
  };
  //详情
  additem(id) {
    console.log(id)
    this.isDisplayfourbox = true;
  }
  //上传文件
  addfile() {
    this.isDisplayaffix = true;
  };
  //新增
  adddisplaybox() {
    this.isDisplaybox = true;
  };
  moveatwolert() {
    this.isDisplaybox = false;
  };
  //新增
  addUser(id) {
    console.log(id)
    this.isDisplay = true;
  };

 //删除列表
 remove(item) {
  this.confirmationService.confirm({
    message: '是否删除选中项?',
    accept: () => {
      let index = this.cars.findIndex(function(value){
        return value==item;
      })
      this.cars.splice(index,1)
    }
  });
};
  //删除
  confirm() {
    this.confirmationService.confirm({
      message: '是否删除选中项?',
      accept: () => {
        this.selectedUser.forEach(item => {
          let index = this.users.findIndex(item2 => {
            return item2.id == item.id;
          })
          this.users.splice(index, 1);
          if (!this.users.length) {
            this.noUserData = true;
          }
        })
      }
    });
    this.isDisplayaffix = false;
  };

  //取消保存
  movealert() {
    this.isDisplay = false;
  }
  addtwolert() {
    this.isDisplaytwobox = true;
  };
  cols: ColumnDefine[] = [//表头
    { header: "文件名", field: "companyName" },
    { header: "文件类型", field: "emplName" },
  ]
  cars: EmplInfo[] = [
    {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:1
    }, {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:2
    }, {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:3
    }, {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:4
    }, {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:5
    }, {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:6
    }, {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:7
    }, {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:8
    }, {
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      id:9
    } 
  ];

  ngOnInit() {
    //表体
    this.users = [{
      id: 111,
      companyName: '世华易居',
      emplName: '张三',
      tel: '123456',
      status: '离职'
    }, {
      id: 222,
      companyName: '世华易居',
      emplName: '张四',
      tel: '123456',
      status: '在职'
    }, {
      id: 333,
      companyName: '世华易居',
      emplName: '张五',
      tel: '123456',
      status: '在职'
    }, {
      id: 444,
      companyName: '世华易居',
      emplName: '张六',
      tel: '123456',
      status: '在职'
    }]
  };
}

