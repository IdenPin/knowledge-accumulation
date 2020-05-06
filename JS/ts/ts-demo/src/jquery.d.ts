// 定义全局变量
// declare var $:(params: () => void) => void

// 定义全局函数
// declare function $(params : () => void) : void

interface JqueryInstance{
  html: (html: string) => JqueryInstance
}

// 函数重载
// declare function $(readyFn: () => void) : void
// declare function $(selector : string) : JqueryInstance

interface JQuery{
  (readyFn: () => void) : void
  (selector : string) : JqueryInstance
}

declare var $: JQuery