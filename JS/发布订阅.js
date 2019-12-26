import { emit } from "cluster"

/**
 * 第一个版本
 */
// var corp = {}

// // 订阅事件容器
// corp.list = []

// // 订阅事件
// corp.on = function (fn) {
//   this.list.push(fn)
// }
// // 发布事件
// corp.emit = function () {
//   this.list.forEach(cb => {
//     cb.apply(this, arguments)
//   })
// }

// corp.on((position, salary) => {
//   console.log(`你的职位是${position},期望薪水${salary}`)
// })
// corp.on((skill, hobby) => {
//   console.log(`你的技能有${skill},爱好${hobby}`)
// })
// corp.emit('前端', 10000)
// console.log('发布订阅器', corp)



/**
 * 第二个版本
 */
// var corp = {}

// // 订阅事件容器
// corp.list = {}

// // 订阅事件
// corp.on = function (key, fn) {
//   // 如果对象中没有订阅对应的key值
//   // 也就是说明没有订阅过，那就给key创建一个缓存列表
//   if (!this.list[key]) {
//     this.list[key] = []
//   }
//   // 把函数添加到对应key的缓存列表里
//   this.list[key].push(fn)
// }

// // 发布事件
// corp.emit = function () {
//   var key = [].shift.call(arguments)
//   var fns = this.list[key]
//   if (!fns || fns.length === 0) {
//     return false
//   }
//   fns.forEach(cb => {
//     cb.apply(this, arguments)
//   })
// }

// corp.on('title', (position, salary) => {
//   console.log(`你的职位是${position},期望薪水${salary}`)
// })
// corp.on('hobby', (hobby) => {
//   console.log(`爱好${hobby}`)
// })



/**
 * 第三个版本
 */

//  let event = {
//     list: {},
//     // 订阅
//     on(key, fn) {
//       if (!this.list[key]) {
//         this.list[k] = []
//       }
//       this.list[k].push(fn)
//     },
//     // 发布
//     emit() {
//       let key = [].shift.call(arguments)
//       let fns = this.list[key]
//       if(!fns || fns.length === 0){
//         return false
//       }
//       fns.forEach(fn => {
//         fn.apply(this, arguments)
//       })
//     },
//     // 移除订阅
//     remove(key, fn){
//       let fns = this.list[key]
//       if(!fns){
//         return false
//       }
//       if(!fn){
//         fns && (fns.length = 0)
//       }else{
//         fns.forEach((cb, i) => {
//           if(cb === fn){
//             fns.splice(i, 1)
//           }
//         })
//       }
//     }
//  }

/**
 * 第4版本
 */
class PubSub {
  constructor() {
    this.subLists = {}
  }
  // 订阅
  subscribe(key, fn) {
    if (!this.subLists[key]) {
      this.subLists[key] = []
    }
    this.subLists[key].push(fn)
  }
  // 发布
  publish() {
    let key = [].shift.call(arguments)
    let fns = this.subLists[key]
    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach(fn => {
      fn.apply(this, arguments)
    })
  }
}

var sub = new PubSub()
sub.subscribe('msg', data => {
  console.log('新消息:', data)
})
sub.publish('msg', async () => {
  let data = ''
  await setTimeout(() => {
    data = '还不错小样 ~'
  }, 2000)
  return data
})



