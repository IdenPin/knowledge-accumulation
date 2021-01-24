/**
 * 数据劫持
 */

class Observer {
  constructor(data) {
    this.observe(data)
  }

  observe(data) {
    if(!data || typeof data !== 'object'){
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])

      /**
       * 深度递归劫持
       */
      this.observe(data[key])
    })
  }

  /**
   * 定义响应式
   * @param {传入的对象} obj
   * @param {对象的key} key
   * @param {对象的值} val
   */

  defineReactive(obj, key, val) {
    let that = this

    // 每个变化的数据，都会有对应一个数组，这个数组是存放所有更新的操作
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if(val !== newVal){

          that.observe(newVal)
          val = newVal

          // 通知所有人，数据更新了
          dep.notify()
        }
      }
    })
  }
}


/**
 * 发布订阅
 */

 class Dep {
   constructor() {
     this.subs = []
     this.addSub()
   }

   addSub(watcher) {
     this.subs.push(watcher)
   }

   notify() {
     this.subs.forEach(watcher => watcher.update())
   }
 }
