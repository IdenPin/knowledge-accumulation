### ESlint 
ESLint 是一个可根据团队编码习惯可配置的 javascript 检查工具。
> 中文站：eslint.cn

#### 为什么要用 ESlint
1. 减少代码冲突
2. 规避常见编码错误
3. 统一团队编码风格
4. 配合现代编辑器实现代码统一格式化

#### 安装
```js
// 本地项目安装
npm install eslint --save-dev

// 全局安装
npm install eslint -g
```

#### 初始化
项目方式安装初始化
`./node_modules/.bin/eslint --init`

全局安装初始化
`eslint --init`

#### 配置
1. 文件配置

    不同方式生成配置文件不同，这些文件优先级分别是：`.eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json`
2. 注释配置

    从高到低依次是：`/*eslint-disable*/ 和 /*eslint-enable*/ /*global*/ /*eslint*/ /*eslint-env*/ `

根据部门情况推荐使用 `standard` 配置：
```js
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}

```


#### 开启规则和发生错误时报告的等级
- 0 或 off 关闭规则
- 1 或 warn 打开规则，并且作为一个警告，不会导致检查不通过
- 2 或 error 打开规则，并且作为一个错误，退出代码

#### 忽略检查
- 忽略 `no-undef` 检查 

  `/* eslint-disable no-undef */`
- 忽略 `no-new` 检查
  
  `/*eslint-disable no-new */`
- 设置检查 `/*eslint eqeqeq: off*/`
  
  `/*eslint eqeqeq: 0*/ `
- 下一行跳过检查

    `eslint-disable-next-line`

#### 设置自动修复
1. 构建 demo
  
    `npm i -y`
2. 安装 eslint

    `npm i eslint --save-dev`

4. 创建 eslint 格式化代码配置文件

    `./node-modules/.bin/eslint --init`
3. 创建 test.js 文件，通过 eslint 检查并自动修复

    `./node-modules/.bin/eslint --fix test.js`

#### 配置忽略 ESlint 检查的文件
项目根目录创建`.eslintignore.js`文件


#### 编辑器上使用
vscode: extensions -> eslint -> install 

webstorm: 
Preferences -> Languages & Frameworks -> JavaScript -> Code Quality Tools -> Eslint -> Enable