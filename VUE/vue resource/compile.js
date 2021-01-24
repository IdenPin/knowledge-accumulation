class Compile{
  constructor(el, vm){
    this.el = this.isElementNode(el) ? this.el : document.querySelector(el)
    this.vm = vm

    if(this.el) {

      // 1、先把真实的dom移入到内存中的fragment里
      let fragment = this.node2fragment(this.el)

      // 2、编译 提取想要的元素节点 v-model 和文本节点 {{}}
      this.compile(fragment)

      // 3、把编译好的fragment塞回到页面里
    }
  }

  /**
   * 工具方法
   */
  // 判断一个元素是否是元素节点  元素：1，文本：3, 属性：2
  isElementNode(node) {
    return node.nodeType === 1
  }
  isDirective(name) {
    return name.includes('v-')
  }


  /**
   * 核心方法
   */

  // 编译元素
  compileElement(node){
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      // attr -> type="text"  v-model="msg"
      // 判断熟悉名称是否包含 v-
      let attrName = attr.name
      if(this.isDirective(attrName)){

        // node\this.vm.$data\expr
        let expr = attr.value
        let type = [,type] = attrName.split('v-')
        CompileUtil[type](node, this.vm, expr)

      }

    })
  }

  // 编译文本
  compileText(node) {
    let expr = node.textContent()
    let reg = /\{\{([^}]+)+\}\}/g   //{{a}}  {{b}}  {{c}}
    if(reg.text(node)){
      // node\this.vm.$data\expr
      CompileUtil['text'](node, this.vm, expr)
    }
  }

  // 编译入口
  compile(fragment) {
    // 需要递归
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node => {
      if(this.isElementNode(node)){
        this.compileElement(node)

        // 是元素节点，还需要继续升入检查
        this.compile(node)
      }else{
        // 文本节点
        this.compileText(node)
      }
    })

  }

  // node 转 fragment
  node2fragment(el) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while(firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}



/**
 * 编译工具
 */
CompileUtil = {
  getVal(vm, expr) {
    // 获取实例上对应的数据
    return expr.split('.').reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },

  getTextVal(vm, expr) {
    // 获取编译文本后的结果
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1])
    })
  },

  // 文本处理
  text(node, vm, expr) {
    let updateFn = this.updater['textUpdater']
    let value = this.getTextVal(vm, expr)

    expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1], (newValue)=> {
        updateFn && updateFn(node, this.getTextVal(vm, arguments[1]))
      })
    })

    updateFn && updateFn(node, value)
  },

  // 输入框处理
  model(node, vm, expr) {
    let updateFn = this.updater['modelUpdater']

    // 增加一个监控，数据变化了应该调用这个 watch 的 callback
    new Watcher(vm, expr, (newValue)=> {
      updateFn && updateFn(node, newValue)
    })
    updateFn && updateFn(node, this.getVal(vm.$data, expr))

  },

  updater: {
    // 文本更新
    textUpdater(node, value) {
      node.textContent = value
    },
    // 输入框更新
    modelUpdater(node, value) {
      node.value = value
    }
  }
}
