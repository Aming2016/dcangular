import {TreeNode} from "primeng/primeng";
import {DataWrapper} from "../system/data-wrapper";

export class TreeNodeWrapper2<T> extends DataWrapper<T> implements TreeNode{
  constructor(public data : T,
              public readLabel: (data:T) => string,
              public readId: (data:T) => string =(data : T) =>  data['id'],
              public readParentId : (data:T) => string,
              public showChildrenCount ?: boolean,
              public check? : (data:T) => boolean,
              public hideLeaf = true
  ){
    super(data, readLabel, readId)
    if(this.check == null){
      this.check = this.defaultParentCheck
    }
  }

  _parent? : TreeNodeWrapper2<T>
  _children? : TreeNodeWrapper2<T>[] = []

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
      return `${this.readLabel(this.data)} (${this.leafCount})`
    }
    return this.readLabel(this.data)
  }

  public static wrapper<ST>(nodes : ST[], readLabel: (data:ST) => string,
                            readId: (data:ST) => string = (data : ST) =>  data['id'],
                            readParentId : (data:ST) => string,showChildrenCount?:boolean
                            ) : TreeNodeWrapper2<ST>[]{
    return nodes.map((d: ST) => {
      return new TreeNodeWrapper2<ST>(d, readLabel, readId,readParentId)
    });
  }

  set parent(parent : TreeNodeWrapper2<T>){
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

  get parent() : TreeNodeWrapper2<T>{
    return this._parent
  }

  get isEmpl(){
    return this.getId().startsWith("e")
  }

  get children() : TreeNodeWrapper2<T>[]{
    if(this.hideLeaf){
      return this.childrenWithoutLeaf
    }
    return this._children
  }

  get childrenWithoutLeaf() : TreeNodeWrapper2<T>[]{
    if(!this.isEmpl){
      let children = this._children.filter(child => {
        return !child.isEmpl
      })
      return children
    }
    return null
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


  get leafCount() : number{
    let count = 0;
    if(this.isEmpl){
      return 1
    } else if(!this.isEmpl){
      for(let c of this._children){
        count += c.leafCount
      }
    }
    return count
  }

  addChild(child : TreeNodeWrapper2<T>){
    for(let c of this._children){
      if(c === child){
        return
      }
    }
    this._children.push(child)
    child.parent = this
  }

  removeChild(child : TreeNodeWrapper2<T>){
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
