/**
 * Vue
 *
 * MVVM
 *
 * 1、模板编译
 * Compile
 *
 * 2、数据劫持
 * Observer
 *
 * 3、观察者
 * Watcher
 */

//  new MVVM({
//    el: '#app',
//    data: {
//      msg: 'abc'
//    }
//  })

class MVVM {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    // 数据劫持
    new Observer(this.$data)

    if(this.$el){
      // 用数据元素进行编译
      new Compile(this.$el, this)
    }
  }
}



