#### 深拷贝 与 浅拷贝
数据类型分为基本类型和引用类型，对基本类型的拷贝就是对值复制进行一次拷贝，而对于引用类型来说，拷贝的不是值，而是值的地址，最终两个变量的地址指向的是同一个值。
```js
var a = 1
var b = a 
b = 2
console.log(a, b) // 1,2

var obj1 = new Object()
var obj2 = obj1
obj2.name = 'pdeng'
console.log(obj1.name)  // pdeng
```
**浅拷贝**：只进行一层关系的拷贝
```js
  // 实现浅拷贝
  // 1. diy
  function shallowClone(o) {
    var obj = {}
    for(let i in o){
      if(o.hasOwnProperty(i)){
        obj[i] = o[i]
      }
    }
    return obj
  }
  // 2. 扩展运算
  var a = { name: 'pdeng' }
  var b = {...a}
  b.name = '三张'
  console.log(a.name, b.name) // pdeng 三张

  // 3. Object.assign()
  var a = { name: 'pdeng' }
  var b = Object.assign({}, a)
  a.name = '四李'
  console.log(a.name, b.name) // 四李  pdeng
```
对于深拷贝来说，在浅拷贝基础上加上递归就可以
**深拷贝**：进行无限层次的拷贝
```js
  // 实现深拷贝
  // 1. diy
  // 存在问题，没有考虑到数组、set\map\weakmap还有递归容易爆栈
  // var a = {}     a.a = a    clone(a) 死循环
  function deepClone(source){
    let target = {}
    for(i in source){
      if(source.hasOwnProperty(i)){
        if(typeof source[i] === 'object'){
          target[i] = deepClone(source[i])
        }else{
          target[i] = source[i]
        }
      }
    }
    return target
  }
  // 2.通过JSON.parse
  function deepClone(source) {
    return JSON.parse(JSON.stringify(source))
  }
```


#### 事件循环 EventLoop
拓展：https://www.bilibili.com/video/av68998172?p=26
js 是单线程使用同步异步解决 js 的阻塞问题。在深入事件循环机制之前，需要先弄懂一下几个概念
- 执行上下文 （Execution context）
- 执行栈 (Execution stack)
- 微任务 (micro-task)
  Promise.then, process.nextTick
- 宏任务  (macro-task)
  主体 script, setTimeout, setInterval
  