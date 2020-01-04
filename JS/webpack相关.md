#### require.context
`require.context()` 可以用来创建自己的context，可以给这个函数传入三个参数。
一个要搜索的目录，一个标记是否搜索其子目录，以及一个匹配的正则表达式，webpack会在构建中解析代码中的require.context()。
语法如下：
```js
require.context(directory, useSubdirectory = false, regExp = /^\.\//);
```

示例：
```js
// 创建一个context,文件夹来自于test目录，require以.test.js结尾
require.context('./test', false, /\.test\.js$/)

// 创建一个context,文件夹来自于所有父文件夹及其所有的子文件夹，require以.stories.js结尾
require.context('../', true, /\.stories\.js$/) 
```