// es6 模块化

declare module 'jquery' {
  interface JqueryInstance{
    html: (html: string) => JqueryInstance
  }
  namespace $ {
    namespace fn{
      class init {}
    }
  }
  // 混合类型
  function $(readyFn: () => void) : void
  function $(selector : string) : JqueryInstance
  export = $
}



