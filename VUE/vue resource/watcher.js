/**
 * 观察者
 * 给需要监控变化的元素增加一个观察者，当数据变化后执行对应的方法
 * 用新值和老值进行比对，如果发生变化，就调用更新方法
 */

 class Watcher {
   constructor(vm, expr, cb) {
      this.vm = vm
      this.expr = expr
      this.cb = cb
      // 先获取老值
      this.value = this.get()
   }

   /**
    * 取值
    * @param {实例} vm
    * @param {表达式} expr
    * @returns
    */
   getVal(vm, expr){
    expr = expr.split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    },vm.$data)
   }
   get(){
      Dep.target = this
      let value = this.getVal(this.vm, this.expr)
      Dep.target = null
      return value
   }

   /**
    * 对外暴露更新方法
    */
   update() {
     let newVal = this.getVal(this.vm, this.expr)
     let oldVal = this.value
      if(newVal !== oldVal){
        this.cb(newVal)
      }
   }
 }
