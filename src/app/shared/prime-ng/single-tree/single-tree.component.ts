import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeNodeWrapper} from "../../../models/prime-ng/tree-node-wrapper";
import {TreeWrapper} from "../../../models/prime-ng/tree-wrapper";
import {TreeNode} from "primeng/primeng";
import {TreeData} from "../../../models/prime-ng/treeData";
import {CommonService} from "../../../empl-service/common.service";

@Component({
  selector: 'app-single-tree',
  templateUrl: './single-tree.component.html',
  styleUrls: ['./single-tree.component.scss']
})
export class SingleTreeComponent implements OnInit {

  //树信息
  treeMsg: TreeData = {};
  treeMsgs:TreeData[] = [];
  treeDatas : TreeWrapper<TreeData>;

  @Input()
  selectedFile : TreeNodeWrapper<TreeData>

  @Input()
  set filterString(filter : string){
    this.selectNodeByName(filter)
  }

  //是否显示数量
  @Input()
  showChildrenCount =true
  //是否添加员工进来
  @Input()
  isAddEmpl=true

  treeNodes : TreeNodeWrapper<TreeData>[]

  @Input()
  city_name:string ='';

  @Input()
  set isLoad(cn : boolean){
    if (cn){
      this.treeNodes=[];

      this.treeMsgs=[];
      this.getDepts();
    }
  }

  @Input()
  treeStyle = {'border-style': 'solid', 'max-height' : '400px','width' : '300px', 'overflow' : 'auto'}

  @Output()
  selectedChange:EventEmitter<TreeData> = new EventEmitter<TreeData>();

  constructor(
    private commonService : CommonService
  ) { }

  nodeSelect(event) {
    if(this.selectedFile != null){
      this.treeMsg=this.selectedFile.data;
      // console.log(this.treeMsg);
      this.selectedChange.emit(this.treeMsg)
      // console.log(this.selectedChange);
    }
  }

  selectNodeByName(filter : string){
    if(!filter){
      return
    }
    for( let node of this.treeDatas.flatNodes){
      if(node.data.label.indexOf(filter) >=0 ){
        this.expandRecursive(node, true)
        this.selectedFile = node
        return
      }
    }
  }


  private expandRecursive(node:TreeNode, isExpand:boolean){
    if(node == null){
      return
    }
    node.expanded = isExpand;
    if(node.parent){
      this.expandRecursive(node.parent, isExpand);
    }
  }



  //获取某分公司的所有部门
  getDepts(){
    this.commonService.deptTreeList(this.city_name).subscribe(treeMsgs => {
    /*  for (let dept of treeMsgs){
        this.treeMsg = {};
        this.treeMsg.id = dept.id.toString();
        this.treeMsg.label = dept.deptName;
        this.treeMsg.parent = dept.parentId.toString();
        this.treeMsgs.push(this.treeMsg);
      }*/
      for (let treeMsg of treeMsgs){
        this.treeMsgs.push(treeMsg);
      }

      if (this.treeMsgs != null){
        if(this.isAddEmpl){
          this.getEmpls();
        }else{
          this.getTreeData();
        }
      }
    })
  }


  //获取某公司的所有员工
  getEmpls(){
    this.commonService.listEmplAll(this.city_name).subscribe(treeMsgs => {
      // for (let emp of emplData){
      //   this.treeMsg = {};
      //   this.treeMsg.id = 'e'+emp.id.toString();
      //   this.treeMsg.label = emp.emplName;
      //   this.treeMsg.parent = emp.deptId.toString();
      //   this.treeMsgs.push(this.treeMsg);
      // }
      for (let treeMsg of treeMsgs){
        this.treeMsgs.push(treeMsg);
      }

      this.getTreeData();
    })
  }

  //组装树
  getTreeData(){
    if(this.treeMsgs != null){
      let rootNode = new TreeNodeWrapper<TreeData>({id:'0',label:'所有部门'},
        (data) => data['label'],(data) => data['id'].toString(),
        (data) => data['parent'].toString(),this.showChildrenCount)
      let tree = new TreeWrapper(rootNode)
      tree.addFlatNodes(TreeNodeWrapper.wrapper<TreeData>(this.treeMsgs, (data) => data['label'],(data) =>data['id'].toString(),(data)=>data['parent'].toString(),this.showChildrenCount))
      tree.hierarchy()
      this.treeDatas = tree;
      this.treeNodes = [this.treeDatas.root]
      console.log(this.treeNodes)
      console.log('---------------------------------')
    }
  }


  ngOnInit() {
    console.log("进入树组件")
  }

}
