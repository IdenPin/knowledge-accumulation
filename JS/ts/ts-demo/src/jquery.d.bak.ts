// 定义全局变量
// declare var $:(params: () => void) => void

// 定义全局函数
// declare function $(params : () => void) : void

interface JqueryInstance{
  html: (html: string) => JqueryInstance
}

// 函数重载
declare function $(readyFn: () => void) : void
declare function $(selector : string) : JqueryInstance

// 如何对对象进行类型定义，以及对类进行类型定义，以及命名空间的嵌套
declare namespace $ {
  namespace fn{
    class init {}
  }
}

// 使用 interface 语法对函数实现重载
// interface JQuery{
//   (readyFn: () => void) : void
//   (selector : string) : JqueryInstance
// }

// declare var $: JQuery