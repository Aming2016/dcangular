import {TreeNode} from "primeng/primeng";
import {DataWrapper} from "../system/data-wrapper";

export class TreeNodeWrapper<T> extends DataWrapper<T> implements TreeNode{
  constructor(public data : T,
              public readLabel: (data:T) => string,
              public readId: (data:T) => string =(data : T) =>  data['id'],
              public readParentId : (data:T) => string,
              public showChildrenCount ?: boolean,
              public check? : (data:T) => boolean
  ){
    super(data, readLabel, readId)
    if(this.check == null){
      this.check = this.defaultParentCheck
    }
    if(this.showChildrenCount ==null){
      this.showChildrenCount =false
    }
  }


  _parent? : TreeNodeWrapper<T>
  _children? : TreeNodeWrapper<T>[] = []

  getParentId():string {
    return this.readParentId(this.data)
  }

  checkParent(other: T) : boolean {
    return this.check(other)
  }

  defaultParentCheck = (data : any) : boolean => {
    if(this.data['areaId']==undefined){
      if(data['id']==0){
        return true
      }
      return false
    }else{
      return this.data['areaId'] == data['id']
    }
  }

  get label() : string{
    if(this.showChildrenCount){
      let cc = this.childrenCount
      if(cc > 0){
        return `${this.readLabel(this.data)} (${cc})`
      }
    }
    return this.readLabel(this.data)
  }

  public static wrapper<ST>(nodes : ST[], readLabel: (data:ST) => string,
                            readId: (data:ST) => string = (data : ST) =>  data['id'],
                            readParentId : (data:ST) => string,showChildrenCount?:boolean
                            ) : TreeNodeWrapper<ST>[]{
    return nodes.map((d: ST) => {
      return new TreeNodeWrapper<ST>(d, readLabel, readId,readParentId,showChildrenCount)
    });
  }

  set parent(parent : TreeNodeWrapper<T>){
    if(this._parent == parent){
      return
    }
    let oldParent = this._parent
    this._parent = parent
    if(parent == null){
      if(oldParent != null){
        oldParent.removeChild(this)
      }
    } else {
      parent.addChild(this)
    }
  }

  get parent() : TreeNodeWrapper<T>{
    return this._parent
  }

  get children() : TreeNodeWrapper<T>[]{
    return this._children
  }

  get childrenCount() : number {
    let count = 0;
    if(this.children == null){
      return 0
    } else {
      for(let c of this.children){
        count += 1 + c.childrenCount
      }
    }
    return count
  }

  addChild(child : TreeNodeWrapper<T>){
    for(let c of this._children){
      if(c === child){
        return
      }
    }
    this._children.push(child)
    child.parent = this
  }

  removeChild(child : TreeNodeWrapper<T>){
    let rmChild = null
    for(let idx in this._children){
      if(this._children[idx] === child){
        rmChild = this._children.splice(+idx,1)
        break
      }
    }
    child.parent = null
    return rmChild
  }
}
