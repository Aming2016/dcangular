import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {date} from "ng2-validation/dist/date";

import 'rxjs/add/operator/toPromise';
import {SelectItem} from "primeng/primeng";
import {TreeNode} from "primeng/primeng";


@Injectable()
export class AddService {

  constructor(private http: HttpClient) {
  }

  fangs: SelectItem[] = [
    {label: '---', value: 0},
    {label: '0', value: 0},
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8}
  ];
  tings: SelectItem[] = [
    {label: '---', value: 0},
    {label: '0', value: 0},
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
  ];

  types: SelectItem[] = [
    {label: '---', value: null},
    {label: '普通住宅', value: '普通住宅'},
    {label: '洋房', value: '洋房'},
    {label: '别墅', value: '别墅'},
    {label: '跃层', value: '跃层'},
    {label: '公寓', value: '公寓'},
  ];

  orientation: SelectItem[] = [
    {label: '---', value: null},
    {label: '南', value: '南'},
    {label: '东', value: '东'},
    {label: '北', value: '北'},
    {label: '西', value: '西'},
    {label: '东南', value: '东南'},
    {label: '东北', value: '东北'},
    {label: '西北', value: '西北'},
    {label: '西南', value: '西南'},
    {label: '不详', value: '不详'}
  ];

  state: SelectItem[] = [
    {label: '---', value: null},
    {label: '在售', value: '在售'},
    {label: '停售', value: '停售'}
  ];

  organizations = [
    {
      "label": "业务部",
      "data": "Documents Folder",
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "children": [{
        "label": "西区",
        "data": "Work Folder",
        "expandedIcon": "fa-folder-open",
        "collapsedIcon": "fa-folder",
      }]
    },
    {
      "label": "南区",
      "data": "Home Folder",
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "children": [
        {"label": "南区A组", "icon": "fa-folder-open", "data": "Invoices for this month"},
        {"label": "南区F组", "icon": "fa-folder-open", "data": "Invoices for this month"}
      ]
    },
    {
      "label": "中华区",
      "data": "Home Folder",
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "children": [{
        "label": "中华区A组",
        "icon": "fa-folder-open",
        "data": "Invoices for this month",
        "children": [{"label": "刘菲"}, {"label": "王伟"}, {"label": "张小明"}]
      }]
    }
  ]
}
