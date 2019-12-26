
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

function Vue(options = {}) {
  this.$options = options
  let data = this._data = this.$options.data
  // 数据劫持
  observe(data)
  // this 代理 this._data
  for(let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get() {
        return this._data[key]
      },
      set(newVal) {
        this._data[key] = newVal
      }
    })
  }
}


function Observe(data) {
  for (let key in data) {
    let val = data[key]
    observe(val);
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return false
        }
        val = newVal
        observe(newVal)
      }
    })
  }
}

// 数据劫持
function observe(data) {
  if (!data || typeof data !== 'object') {
    return false
  }
  new Observe(data)
}


var app = new Vue({
  el: '#app',
  data: { nickName: 'pdeng', age: 20, hobby: 'play game ..', test: {
    a: '110'
  }}
})