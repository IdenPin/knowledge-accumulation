// // 匿名函数的第二种写法 !~ 开头都可以
// !function(){}()


!(function(global, factory) {})(this, function() {})(
  // AMD: define   CMD: define   Commonjs: module.exports
  (global, factory) => {
    // commonjs、cmd 环境
    if (typeof module === "object" && typeof module !== "undefined") {
      module.exports = factory();
    } else {
      // amd
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        global.biz = factory();
      }
    }
  }
)(this, () => {
  return function() {
    console.log("走你 。。。");
  };
});


//   typeof exports === "object" && typeof module !== "undefined" 
//   ? module.exports = factory()
//   : typeof define === "function" && define.amd
//     ? define(factory)
//     : (global.biz = factory());


// })(this, function() {
//   return function() {
//     console.log('---走你.')
//   }
// })



