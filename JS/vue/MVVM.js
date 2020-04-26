// 观察者（发布订阅） 
class Dep {
  constructor() {
    // 存放所有的 watcher
    this.subs = []
  }
  // 订阅（添加 watcher）
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 发布
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}




class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 默认先存放一个老值
    this.oldVal = this.get()
  }
  get() {
    Dep.target = this
    let value = CompileUtil.getVal(this.vm, this.expr)
    Dep.target = null 
    return value
  }
  update() {
    // 更新操作 数据变化后 会调用观察者的 update 方法
    let newVal = CompileUtil.getVal(this.vm, this.expr)
    if(newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}




class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if(data && typeof data === 'object'){
      // 如果是对象
      for(let key in data) {
        this.defineReactive(data, key, data[key])
      }
    }
  }
  defineReactive(data, key, value) {
    this.observer(value)
    // 给每个属性都加上一个具有发布订阅的功能
    let dep = new Dep()
    Object.defineProperty(data, key, {
      get(){
        // 创建 watcher 时，会去到对应的内容， 并且把 watcher 放到全局
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newVal) =>{
        if(newVal !== value){
          this.observer(newVal)
          value = newVal
          dep.notify()
        }
      }
    })
  }
}


class Compiler{
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    // 把当前节点元素获取到、放到内存中
    this.vm = vm
    let fragment = this.node2Fragment(this.el)
    // 把节点内容替换

    // 用数据编译模板
    this.compile(fragment)
    // 把替换后内容再塞到页面
    this.el.appendChild(fragment)
  }
  // 判断是否是指令
  isDirective(attrName){
    return attrName.startsWith('v-')
  }
  // 编译元素
  compileElement(node) {
    // 类数组
    let attributes = node.attributes  // type=text v-model=msg
    ;[...attributes].forEach(attr => {
      let {name, value:expr} = attr   // v-model = "time.msg"
      if(this.isDirective(name)) {  
        // 指令节点  
        const [, directive] = name.split('-')
        //  v-on:click  
        const [directiveName, eventName] = directive.split(':')
        CompileUtil[directiveName](node, expr, this.vm, eventName)
      }
    })
  }
  // 编译文本
  compileText(node) {
    let content = node.textContent
    if(/\{\{(.+?)\}\}/.test(content)){
      // 找到所有文本
      CompileUtil['text'](node, content, this.vm)
    }
  }
  // 核心编译方法
  compile(node) {
    // 编译内存中的dom节点
    let childrenNode = node.childNodes
    ;[...childrenNode].forEach(child => {
      if(this.isElementNode(child)) {
        this.compileElement(child)
        // 元素节点 需要再把自己传进去 去遍历子节点
        this.compile(child)
      }else{
        // 非元素节点[文本]
        this.compileText(child)
      }
    })
  }
  // 把节点移到内存中
  node2Fragment(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment()
    let firstChild
    while(firstChild = node.firstChild) {
      // appendChild 具有移动性
      fragment.appendChild(firstChild)
    }
    return fragment
  }
  isElementNode(node) {
    // 是不是元素节点
    return node.nodeType === 1
  }
}
CompileUtil = {
  getVal(vm, expr){
    // [time, msg]
    return expr.split('.').reduce((acc, v) => {
      return acc[v]
    }, vm.$data)
  },
  // vm.$data 'item.msg' = 'pdeng'
  setVal(vm, expr, value) {
    return expr.split('.').reduce((acc, v, index, arr) => {
      if(arr.length === index + 1) {
        //如果是最后一项
        return acc[v] = value 
      }
      return acc[v]
    }, vm.$data)
  },
  // 节点、表达式、当前实例
  model(node, expr, vm) {
    // expr -> time.msg
    let fn = this.updater['modelUpdater']
    // 给输入框添加一个观察者，如果稍后数据更新了会触发此方法
    // 会拿新值给输入框赋值
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal)
    })
    node.addEventListener('input', (e) => {
      let value = e.target.value
      this.setVal(vm, expr, value)
    })
    let value = this.getVal(vm, expr)
    fn(node, value)
  },
  on(node, expr, vm, eventName){
    // v-on:click = changeName
    node.addEventListener(eventName, (e) => {
      vm[expr].call(vm, e)
    })
  },
  html(node, expr, vm) {
    // v-html="message"
    let fn = this.updater['htmlUpdater']
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal)
    })
    let value = this.getVal(vm, expr)
    fn(node, value)
  },
  getContentVal(vm, expr) {
    // 遍历表达式 将内容重新替换成一个完整的内容返回回去
    return expr.replace(/\{\{(.+?)\}\}/g, (...arg) => {
      return this.getVal(vm, arg[1])
    })
  },
  text(node, expr, vm){ // {{a}} {{b}}
    let fn = this.updater['textUpdater']
    // expr -> {{age}} {{time.name}}
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...arg) => {
      // 给表达式中每个{{}}都添加观察者
      new Watcher(vm, arg[1], () => {
        // 返回一个全的字符串
        fn(node, this.getContentVal(vm, expr))
      })
      return this.getVal(vm, arg[1])
    })
    fn(node, content)
  },
  updater: {
    // 把数据插入到节点中
    modelUpdater(node, value) {
      node.value = value
    },
    // 处理文本节点
    textUpdater(node, value){
      node.textContent = value
    },
    htmlUpdater(node, value) {
      node.innerHTML = value
    }
  }
}
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    let computed = options.computed
    let methods = options.methods
    if(this.$el) {
      // 使用 Object.defineProperty 重新定义数据
      new Observer(this.$data)
    

      for(let key in computed){
        // 有依赖关系
        Object.defineProperty(this.$data, key, {
          get: () =>{
            return computed[key].call(this)
          }
        })
      }
      for(let key in methods){
        Object.defineProperty(this, key, {
          get(){
            return methods[key]
          }
        })
      }

      // 把 vm 上的取值操作都代理到 vm.$data 上
      this.proxyVm(this.$data)

      // 编译模板
      new Compiler(this.$el, this)
    }
  }
  proxyVm(data) {
    // 38.17
    for(let key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal){
          data[key] = newVal
        }
      })
    }
  }
}