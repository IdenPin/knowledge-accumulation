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


#### 如何管理资源 ？
把它们各自新建一个目录，都放在 assets 目录下面分类，供其它地方调用。使用alias更好重命名。
```js
const path = require('path')
function resolve(dir) {
  return path.join(___dirname, dir)
}
module.exports = {
  // ...
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
  }
}
```

一般将 Vue 项目资源划分为4种。
##### 字体 `fonts`
##### 小图标 `icons`
1. 使用 `iconfont`阿里图标，下载`.eot .ttf .woff. .woff2`，通过引入`iconfont` 让 `icon`组件化
    ```js
    <template>
      <i class="iconfont" v-on="$listeners" :class="name" />
    </template>

    export default {
      props: {
        name: String
      }
    }

    <style lang="scss" scoped>
    .iconfont {
      font-size: 16px;
      color: $color-icon;
    }
    ```
2. 引入图片作为 `icon`
    ```html
    <template>
      <img 
        :src="require(`@/assets/images/${name}.png`)"
        v-bind="$attrs"
        v-on="$listeners"
        :style="{'width': width ? width + 'px' : size + 'px', 'height': height ? height + 'px' : size + 'px' }"
      />
    </template>
    <script>
    export default {
      name: 'app-img',
      props: {
        name: {
          type: String,
          default: ''
        },
        size: {
          type: Number,
          default: 16
        },
        width: {
          type: Number,
          default: 0
        },
        height: {
          type: Number,
          default: 0
        }
      }
    }
    </script>
    ```
##### 图片 `images`
##### 样式 `styles`
将样式按照模块划分到不同的文件中，然后统一导入到`index.scss`中
```css
├── element-ui.scss
├── hack.scss
├── index.scss
├── laytpl.scss
├── mixin.scss
├── nprogress.scss
├── resize.scss
├── sidebar.scss
├── transition.scss
└── variables.scss

@import 'resize';
@import 'variables';
@import 'transition';
@import 'element-ui';
@import 'laytpl';
@import 'mixin';
@import 'nprogress';
@import 'hack';
```
#### 如何管理 `vue-router` ？
在`src`目录下创建一个`router`文件夹，`router`文件夹下面再创建一个`modules`文件夹和`index.js`入口文件。
`modules`文件是用来存放不同子模块下面的路由。

```html
├── index.js
└── modules
    ├── moduleA
    ├── moduleB
    └── moduleC
```

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import ModuleA from '@/router/moduleA
import ModuleB from '@/router/moduleB
import ModuleC from '@/router/moduleC
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  ModuleA,
  ModuleB,
  ModuleC,
  ...
]

const router = new VueRouter({
  model: 'hash',
  routes,
  base: process.env.BASE_URL,
  props: true
})
export default router
```

#### 关于 `components`
根据组件复用情况，一般分为全局公共组件和业务组件。全局组件建议存放在 `@/components`中，各业务模块如果只有当前业务模块使用就直接在`views`文件夹业务模块中创建`@/views/bizA/components`中。

#### Axios 请求分装和接口管理
如果业务简单页面请求非常少直接使用axios也没有什么大影响。但是在一个大项目中对 `Axios` 进行二次封装尤为重要，想象下如果一个项目有上百个请求，突然有一天后端开发人员说需要在所有请求头加入一个字段，如果接口没有做统一管理，修改调整一百多个接口是多么痛苦的。所以我建议不管大项目小项axios请求二次封装是很有必要的。

一般会在`@/utils`目录下创建一个`request.js`用来封装统一请求工具函数，`@/api`目录下用来存放接口协议。如果业务发在也建议将api文件夹下面的文件按照模块拆分。

```html
├── moduleA
├── moduleB
└── moduleC

```