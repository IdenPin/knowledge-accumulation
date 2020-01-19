### Vue 项目开发常用小技巧汇总
#### Sass 如何全局引入 ?
一般我们会把项目中常用的 css 变量抽离到一个文件中，便于后期统一维护。但是这个 css 我们会发现基本每个业务模块都需要导入
`@import '@/assets/variables.scss'`，为了方便操作我们可以在 `vue.config.js` 中全局导入。代码如下
``` js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/variables.scss";
          @import "@/scss/mixins.scss";
        `
      }
    }
  }
}
```