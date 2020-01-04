
/**
 * 数据劫持
 */
// function Vue(options = {}) {
//   this.$options = options
//   let data = this._data = this.$options.data
//   // 数据劫持
//   observe(data)
// }
// function Observe(data) {
//   for(key in data) {
//     let val = data[key]
//     observe(val);
//     Object.defineProperty(data, key, {
//       configurable: true,
//       get() {
//         return val
//       },
//       set(newVal){
//         if(val === newVal) {
//           return false
//         }
//         val = newVal
//         observe(newVal)
//       }
//     })
//   }
// }

// // 数据劫持
// function observe(data) {
//   if(!data || typeof data !== 'object') {
//     return false
//   }
//   new Observe(data)
// }





// var app = new Vue({
//   el: '#app',
//   data: { name: 'pdeng', age: 20, hobby: ['lol', 'movie'] }
// })




/**
 * 数据代理
 */

// // 数据劫持
// function Vue(options = {}) {
//   this.$options = options
//   let data = this._data = this.$options.data
//   // 数据劫持
//   observe(data)
//   // this 代理 this._data
//   for(let key in data) {
//     Object.defineProperty(this, key, {
//       configurable: true,
//       get() {
//         return this._data[key]
//       },
//       set(newVal) {
//         this._data[key] = newVal
//       }
//     })
//   }
// }


// function Observe(data) {
//   for (let key in data) {
//     let val = data[key]
//     observe(val);
//     Object.defineProperty(data, key, {
//       configurable: true,
//       get() {
//         return val
//       },
//       set(newVal) {
//         if (val === newVal) {
//           return false
//         }
//         val = newVal
//         observe(newVal)
//       }
//     })
//   }
// }

// // 数据劫持
// function observe(data) {
//   if (!data || typeof data !== 'object') {
//     return false
//   }
//   new Observe(data)
// }


// var app = new Vue({
//   el: '#app',
//   data: { nickName: 'pdeng', age: 20, hobby: 'play game ..', test: {
//     a: '110'
//   }}
// })


/**
 * 数据编译
 */

// function Vue(options = {}) {
//   this.$options = options
//   let data = this._data = this.$options.data
//   // 数据劫持
//   observe(data)
//   // this 代理 this._data
//   for(let key in data) {
//     Object.defineProperty(this, key, {
//       configurable: true,
//       get() {
//         return this._data[key]
//       },
//       set(newVal) {
//         this._data[key] = newVal
//       }
//     })
//   }
//   // 编译
//   new Compile(this.$options.el, this)
// }


/**
 * 数据劫持
 */
// function Observe(data) {
//   for (let key in data) {
//     let val = data[key]
//     observe(val);
//     Object.defineProperty(data, key, {
//       configurable: true,
//       get() {
//         return val
//       },
//       set(newVal) {
//         if (val === newVal) {
//           return false
//         }
//         val = newVal
//         observe(newVal)
//       }
//     })
//   }
// }

// // 数据劫持
// function observe(data) {
//   if (!data || typeof data !== 'object') {
//     return false
//   }
//   new Observe(data)
// }


/**
 * 编译
 */
// function Compile(el, vm){
//   vm.$el = document.querySelector(el)
//   // 操作内存、节省开销
//   let fragment = document.createDocumentFragment()
//   while (child = vm.$el.firstChild) {
//     // 将el中的内容放入内存中
//     fragment.appendChild(child)
//   }

//   // 对el里面的内容进行替换
//   function replace(frag) {
//     Array.from(frag.childNodes).forEach( node => {
//       let txt = node.textContent
//       let reg = /\{\{(.*?)\}\}/g
//       if(node.nodeType === 3 && reg.test(txt)) {
//         // 匹配到的第一个分组 如： a.b, c
//         console.log(RegExp.$1);
//         let arr = RegExp.$1.split('.')
//         let val = vm
//         arr.forEach(key => {
//           val = val[key]
//         })
//         node.textContent = txt.replace(reg, val).trim()
//       }
//       // 如果还有子节点， 继续递归
//       if(node.childNodes && node.childNodes.length) {
//         replace(node)
//       }
//     })
//   }

//   replace(fragment)
//   vm.$el.appendChild(fragment)
// }


/**
 * 发布订阅模式
 */
// function Dep() {
//   this.subs = []
// }

// // 订阅
// Dep.prototype = {
//   // 订阅事件
//   addSub(fn) {
//     this.subs.push(fn)
//   },
//   notify() {
//     // 绑定的方法，给所有订阅的事件添加一个update方法
//     this.subs.forEach(sub => sub.update())
//   }
// }

// // 发布
// function Watcher(fn) {
//   this.fn = fn
// }
// Watcher.prototype.update = function() {
//   this.fn()
// }


function Observe(data) {
  let dep = new Dep()
  for(key in data) {
    let val = data[key]
    observe(val);
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);  
        return val
      },
      set(newVal){
        if(val === newVal) {
          return false
        }
        val = newVal
        observe(newVal)
        dep.notify();
      }
    })
  }
}

// 数据劫持
function observe(data) {
  if(!data || typeof data !== 'object') {
    return false
  }
  new Observe(data)
}


function Dep() {
  this.subs = []
}

// 订阅
Dep.prototype = {
  // 订阅事件
  addSub(fn) {
    this.subs.push(fn)
  },
  notify() {
    // 绑定的方法，给所有订阅的事件添加一个update方法
    this.subs.forEach(sub => sub.update())
  }
}

// 发布
function Watcher(vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp
  Dep.target = this
  let arr = exp.split('.')
  let val = vm
  arr.forEach(key => {
    val = val[key]
  })
  Dep.target = null
}
Watcher.prototype.update = function () {
  let arr = this.exp.split('.')
  let val = this.vm;
  arr.forEach(key => {
    val = val[key]
  })
  this.fn(val)
}
function Compile(el, vm) {
  vm.$el = document.querySelector(el)
  // 操作内存、节省开销
  let fragment = document.createDocumentFragment()
  while (child = vm.$el.firstChild) {
    // 将el中的内容放入内存中
    fragment.appendChild(child)
  }

  // 对el里面的内容进行替换
  function replace(frag) {
   if (node.nodeType === 1) {  // 元素节点
      let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
      Array.from(nodeAttr).forEach(attr => {
        let name = attr.name;   // v-model  type
        let exp = attr.value;   // c        text
        if (name.includes('v-')) {
          node.value = vm[exp];   // this.c 为 2
        }
        // 监听变化
        new Watcher(vm, exp, function (newVal) {
          node.value = newVal;   // 当watcher触发时会自动将内容放进输入框中
        });

        node.addEventListener('input', e => {
          let newVal = e.target.value;
          // 相当于给this.c赋了一个新值
          // 而值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现了更新
          vm[exp] = newVal;
        });
      });
    }
    Array.from(frag.childNodes).forEach( node => {
      let txt = node.textContent
      let reg = /\{\{(.*?)\}\}/g
      if(node.nodeType === 3 && reg.test(txt)) {
        // 匹配到的第一个分组 如： a.b, c
        let arr = RegExp.$1.split('.')
        let val = vm
        arr.forEach(key => {
          val = val[key]
        })
        node.textContent = txt.replace(reg, (matched, placeholder) => {
          new Watcher(vm, placeholder, replaceTxt);   // 监听变化，进行匹配替换内容
          return placeholder.split('.').reduce((val, key) => {
            return val[key];
          }, vm);
        })
        new Watcher(vm, RegExp.$1, newVal => {
          node.textContent = txt.replace(reg, newVal).trim()
        })
      }
      // 如果还有子节点， 继续递归
      if(node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }

  replace(fragment)
  vm.$el.appendChild(fragment)
}


// 通过Object.defineProperty的get和set进行数据劫持
// 通过遍历data数据进行数据代理到this上
// 通过{ { } } 对数据进行编译
// 通过发布订阅模式实现数据与视图同步



var app = new Vue({
  el: '#app',
  data: { nickName: 'pdeng', age: 20, hobby: 'play game ..', test: {
    a: '110'
  }}
})