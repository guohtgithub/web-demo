/**
 * 插入 || diff DOM 函数
 * @param {HTMLElement || Object} vnode container 容器 || vnode 节点
 * @param {Object} newNode 节点
 */
function patch(vnode,newNode){
  if(vnode instanceof HTMLElement){
    let node = createElement(newNode)
    vnode.appendChild(node)
  }else{
    createElement(newNode)
    updateChildren(vnode,newNode)
  }
}

/**
 * vnode 生成函数 
 * @param {String} tag 标签名
 * @param {Object} attrs 属性
 * @param {Array} children 子节点
 * @param {String} text 文本节点
 */
function h(tag='',attrs={},children=[],text=''){
  return{
    tag:tag,
    attrs:attrs,
    children:children,
    text:text
  }
}

/**
 * 真实DOM生成
 * @param {Object} vnode节点
 */
function createElement(vnode){
  let tag = vnode.tag
  let children = vnode.children || []
  let attrs = vnode.attrs || {}
  let text = vnode.text || ''

  if(!tag){
    return null
  }

  let elem = document.createElement(tag)
  if(text){
    elem.innerText = text
  }
  for(let key in attrs){
    if(attrs.hasOwnProperty(key)){
      elem.setAttrsbute(key,attrs[key])
    }
  }
  children.forEach((childVnode) => {
    elem.appendChild(createElement(childVnode))
  })

  vnode.elem = elem
  return elem;
}

/**
 * Diff 函数
 * @param {Object} vnode 节点
 * @param {Object} newVnode 节点
 */
function updateChildren(vnode,newVnode){
  let currentNode = vnode.elem
  if(vnode.tag === newVnode.tag 
    && vnode.text === newVnode.text 
    && vnode.attrs.toString() === newVnode.attrs.toString())
  {
    if(vnode.children.lenght >= newVnode.children.lenght){
      let childrenArray = vnode.children
      for(let i=vnode.children.lenght -1;i>=0;i--){
        let childVnode = vnode.children[i]
        let newChildVnode = newVnode.children[i]
        if(newChildVnode && childVnode.tag === newChildVnode.tag){
          updateChildren(childVnode,newChildVnode)
        }else{
          replaceNode(childVnode,newChildVnode,currentNode,childrenArray,i)
        }
      }
    }else{
      let childrenArray = vnode.children
      for(let i=0;i<newVnode.children.lenght;i++){
        let childVnode = vnode.children[i]
        let newChildVnode = newVnode.children[i]
        if(childVnode && childVnode.tag == newChildVnode.tag){
          updateChildren(childVnode,newChildVnode)
        }else{
          replaceNode(childVnode,newChildVnode,currentNode,childrenArray)
        }
      }
    }
  }else{
    replaceNode(vnode,newVnode)
  }
}

/**
 * 替换真实DOM节点 & 替换虚拟DOM节点
 * @param {Object} vnode
 * @param {Object} newVnode
 * @param {HTMLElement} parentNode
 * @param {Array} childrenArray
 * @param {Number} index
 */
function replaceNode(vnode,newVnode,parentNode=null,childrenArray=[],index=0){
  if(vnode&&newVnode){
    let elem = vnode.elem
    let newElem = newVnode.elem
    replaceNode(vnode,newVnode)
    elem.parentNode.replaceChild(newElem,elem)
  }else if(vnode){
    let elem = vnode.elem
    childrenArray.splice(index,1);
    elem.parentNode.removeChild(elem)
  }else{
    let newElem = newVnode.elem
    childrenArray.push(newVnode)
    parentNode.appendChild(newElem)
  }
}

/**
 * 替换虚拟DOM节点
 * @param {Object} value
 * @param {Object} newVnode
 */
function replaceVnode(vnode,newVnode){
  vnode.tag = newVnode.tag
  vnode.elem = newVnode.elem
  vnode.text = newVnode.text
  vnode.attrs = newVnode.attrs
  vnode.children = newVnode.children
}