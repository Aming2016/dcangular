import {TreeNodeWrapper} from "./tree-node-wrapper";

export class TreeWrapper<T> {

  constructor(public root: TreeNodeWrapper<T>) {
    this.flatNodes.push(root)
  }

  public flatNodes: TreeNodeWrapper<T>[] = []

  addFlatNode(node: TreeNodeWrapper<T>) {
    this.flatNodes.push(node)
  }

  addFlatNodes(nodes: TreeNodeWrapper<T>[]) {
    this.flatNodes.push(...nodes)
  }

  hierarchy(flatNodes: TreeNodeWrapper<T>[] = this.flatNodes, parentNodeIdx = 0, treeLength = 1): number {
    let parentNode = flatNodes[parentNodeIdx];
    let curParentId = parentNode.getId();
    let length = this.flatNodes.length
    for (let i = treeLength; i < length; i++) {
      let curNode = flatNodes[i]
      if (curNode.getParentId() == curParentId) {
        flatNodes.swap(treeLength, i)
        curNode.parent = parentNode

        treeLength++
      }
    }

    parentNodeIdx ++
    if(parentNodeIdx < treeLength){
      treeLength = this.hierarchy(flatNodes, parentNodeIdx, treeLength)
    }
    return treeLength
  }

  hierarchy2(flatNodes: TreeNodeWrapper<T>[] = this.flatNodes, parentNodeIdx = 0, treeLength = 1): number {
    let parentNode = flatNodes[parentNodeIdx];
    let curParentId = parentNode.getId();
    let length = this.flatNodes.length
    for (let i = treeLength; i < length; i++) {
      let curNode = flatNodes[i]

      if (curNode.checkParent(parentNode.data)) {
        flatNodes.swap(treeLength, i)
        curNode.parent = parentNode
        treeLength++
      }
    }

    parentNodeIdx ++
    if(parentNodeIdx < treeLength){
      treeLength = this.hierarchy(flatNodes, parentNodeIdx, treeLength)
    }
    return treeLength
  }





  findNode(nodeId : string){
    for(let node of this.flatNodes){
      if(node.getId() == nodeId){
        return node
      }
    }
    return null
  }

  removeNode(node : string | TreeNodeWrapper<T>, recursive = false) : boolean{

    if(typeof node == "string"){
      for(let idx in this.flatNodes) {
        let curNode = this.flatNodes[idx]
        if(curNode.getId() == node){
          return this.removeNode(curNode, recursive)
        }
      }
    } else {
      if(node.children.length > 0){
        if(!recursive){
           console.warn("can't remove node with children in the tree")
          return false
        }

        while(node.children.length > 0){
          let ret = this.removeNode(node.children[0], recursive)
          if(!ret){
            return false
          }
        }
      }
      node.parent = null
      for(let idx in this.flatNodes) {
        if(this.flatNodes[idx] == node){
          this.flatNodes.splice(+idx,1)
          break
        }
      }
    }

    return true
  }
}
