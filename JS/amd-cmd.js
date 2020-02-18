// 匿名函数的第二种写法 !~ 开头都可以
!function(){}()


// 三大模块化标准
// AMD->define  CMD->define commonjs->module.exports
(function(global, factory){
  // if (typeof exports === "object" && typeof module !== "undefined") {
  //   module.exports = factory()
  // }else {
  //   if(typeof define === "function" && define.amd){
  //     define(factory)
  //   }else{
  //     global.biz = factory()
  //   }
  // }

  typeof exports === "object" && typeof module !== "undefined" 
  ? module.exports = factory()
  : typeof define === "function" && define.amd
    ? define(factory)
    : (global.biz = factory());


})(this, function() {
  return function() {
    console.log('---走你.')
  }
})

