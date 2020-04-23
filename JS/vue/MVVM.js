
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
      let {name, value:expr} = attr   // v-model = "school.msg"
      if(this.isDirective(name)) {  
        // 指令节点
        const [,directive] = name.split('-')
        CompileUtil[directive](node, expr), this.vm
      }
    })
  }
  // 编译文本
  compileText(node) {
    let content = node.textContent
    if(/\{\{(.+?)\}\}/.test(content)){
      // 找到所有文本
      console.log('text', content)
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
  // 节点、表达式、当前实例
  model(node, expr, vm) {

  },
  html() {

  },
  text(){

  }
}

class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    if(this.$el) {
      new Compiler(this.$el, this)
    }
  }
}