import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeNode} from "primeng/primeng";
import {Logger} from "../../../data/logger/logger.service";
import {UtilService} from "../../../core/util.service";
import {TreeWrapper} from "../../../models/prime-ng/tree-wrapper";
import {TreeNodeWrapper} from "../../../models/prime-ng/tree-node-wrapper";

@Component({
  selector: 'app-prime-tree',
  templateUrl: './prime-tree.component.html',
  styleUrls: ['./prime-tree.component.scss']
})
export class PrimeTreeComponent<T> implements OnInit {

  private logger: Logger

  constructor(private util: UtilService) {
    this.logger = util.createLogger(this)
  }

  ngOnInit() {

  }

  treeNodes : TreeNodeWrapper<T>[]

  _treeData : TreeWrapper<T>
  @Input()
  set treeData(treeData : TreeWrapper<T>){
    this._treeData = treeData
    if(this._treeData != null && this.selectAll){
      setTimeout(()=>{
        if(this.options.selectAll){
          this.selectAll()
        }
        if(this.options.expandAll){
          this.expandAll()
        }
        this.treeNodes = [this._treeData.root]
      },0)
    }
  }

  get treeData() : TreeWrapper<T>{
    return this._treeData
  }

  @Input()
  set style(treeStyle : any){
      if(treeStyle!=null){
          this.treeStyle = treeStyle
      }
  }
  treeStyle = {'border-style': 'none', 'max-height' : '500px', 'overflow' : 'auto'}

  @Input()
  options : TreeOptions = {}

  @Input()
  selected : TreeNodeWrapper<T>[]

  @Output()
  selectedChange = new EventEmitter<TreeNode[]>();

  selChange(nodes : TreeNode[]){
    // console.log("change : "+JSON.stringify(nodes[0].data))
    this.selectedChange.emit(nodes)
  }

  selectAll(){
    if(this.treeData != null){
      this.selected = this.treeData.flatNodes
      this.selectedChange.emit(this.selected)
    }
  }

  expandAll(){
    if(this.treeData != null){
      this.expandRecursive(this.treeData.root, true)
    }
  }

  collapseAll(){
    if(this.treeData != null) {
      this.expandRecursive(this.treeData.root, false)
    }
  }

  private expandRecursive(node:TreeNode, isExpand:boolean){
    if(node == null){
      return
    }
    node.expanded = isExpand;
    if(node.children){
      node.children.forEach( childNode => {
        this.expandRecursive(childNode, isExpand);
      } );
    }
  }


  removeNode(node : string|TreeNodeWrapper<T>, recursive = false) : boolean{
    if(typeof node == 'string'){
      this.removeNode(this.treeData.findNode(node), recursive)
    } else {
      if(node != null){
        let ret = this.treeData.removeNode(node, recursive)
        if(ret == false){
          return false
        }

        for(let i = this.selected.length - 1 ; i >=0;  i--){
          if(!this.treeData.findNode(this.selected[i].getId())){
            this.selected.splice(i,1)
          }
        }
        this.selChange(this.selected)
      }
    }
    return true;
  }
}

export interface TreeOptions{
  showChildrenCount? : boolean
  selectAll? : boolean
  expandAll? : boolean
}
