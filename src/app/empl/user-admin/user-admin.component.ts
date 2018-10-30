import {Component, OnInit, Input} from '@angular/core';
import {ColumnDataType, ColumnDefine} from '../../models/system/column-define'
import {ConfirmationService} from 'primeng/api';
import {EmplInfo, CompanyUnit, AddOneUser, ch, SelectItem} from "../../models/invest/empl-info";
import { getRangeDate } from "../../../utils/util";
import { CommonService } from '../../empl-service/common.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  noUserData: boolean = false;//没有数据
  isDisplay: boolean = false;//新增box
  searchValue: any[];//选中智能查询
  departmentValue: number = 1;//选中部门
  jobingValue: number = 1;//选中状态
  ch: any = ch;//日期汉化
  // 部门
  department: SelectItem[] = [
    {label: '部门一', value: 1},
    {label: '部门二', value: 2},
    {label: '部门三', value: 3},
  ];
  // 智能查询
  search: SelectItem[] = [
    {label: '查询一', value: 1},
    {label: '查询二', value: 2},
    {label: '查询三', value: 3},
  ];
  // 在职状态
  isJobing: SelectItem[] = [
    {label:'在职', value: 1},
    {label:'离职', value: 2}
  ];
  // 职位
  jobName: SelectItem[] = [
    {label:'董事长', value: 1},
    {label:'总监', value: 2}
  ]
  // 性别
  sexName: SelectItem[] = [
    {label:'男', value: 1},
    {label:'女', value: 2}
  ]
  //用户管理
  cols: ColumnDefine[] = [//表头
    {header: "子公司", field: "companyName"},
    {header: "姓名", field: "emplName"},
    {header: "电话",field: "tel"},
    {header: "性别",field: "sex"},
    {header: "身份证",field: "idNo"},
    {header: "银行",field: "bankName"},
    {header: "银行卡账号",field: "bankAccount"},
    {header: "部门",field: "deptName"},
    {header: "职位",field: "positionName"},
    {header: "账号",field: "emplAcco"},
    {header: "状态",field: "status"}, 
    {header: "创建时间",field: "createDateTime"},
    {header: "最后修改时间",field: "lastUpdateTime"}
  ]
  users: EmplInfo[] = [//用户列表
    {id: 111,companyName :'世华易居',emplName : '张三',tel: '123456',status: '离职'},
    {id: 222,companyName :'世华易居',emplName : '张三',tel: '123456',status: '离职'},
    {id: 333,companyName :'世华易居',emplName : '张三',tel: '123456',status: '离职'}
  ];
  selectedUser : any[];//选中的用户
  ColumnDataType = ColumnDataType;
  constructor(private confirmationService: ConfirmationService,
              private commonService: CommonService) {
    
  };
  ngOnInit() {   
    this.commonService.deptTreeList('beihai').subscribe(v=>{
      console.log(v)
    })
   this.commonService.getCityListByType({'cityName':'beihai'}).subscribe(v=>{
     console.log(v)
   })

  };

  //删除用户
  deleteUser() {
    this.confirmationService.confirm({
        message: '是否删除选中项?',
        accept: () => {
          this.selectedUser.forEach(item=>{
            let index = this.users.findIndex(item2=>{
              return item2.id == item.id;
            })
            this.users.splice(index,1);
            if(!this.users.length){
              this.noUserData = true;
            }
          })
        }
    });
  };

  //新增
  addUser() {
    this.isDisplay = true;
  };

  //取消对话框
  cancelDialog() {
    this.isDisplay = false;
  };
  
  //保存
  confirmSave() {
    let newUser = new AddOneUser();
    newUser.createDateTime = getRangeDate();
    this.users.push(newUser);
    this.cancelDialog();
  };  
  
}
