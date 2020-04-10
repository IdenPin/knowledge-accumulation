#### cookie 
特点：
1. 存储在用户电脑上的
2. 不同浏览器之间 `cookie` 不共享
3. `cookie` 是按照不同站点进行存放的

cookie 存储：
1. 默认浏览器关闭以后 `cookie` 就没有了
2. `document.cookie`一次只能设置一个`cookie`值
3. `expires`用来设置有效期，值是日期（国际标准时间）对象字符串


cookie 获取：
通过 `document.cookie` 来获取，正则匹配指定的 key
`new RegExp('(^|\\s)'+ attr +'=([^;]+)(;|$)')`

```js
// 注意必须在服务器环境下才能生效（火狐浏览器除外）

// 获取当前时间戳
const nowTime = new Date().getTime() 
// 设置过期时间
const expiresTime = new Date(`${nowTime}`${30*24*60*60*1000})
document.cookie = `name=张三;expires=${expiresTime.toUTCString()}`

/**
 * 工具函数
*/

// 设置 cookie
function setCookie(obj, day = 30) {
  const expiresTime = new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000).toGMTString()
  if(obj instanceof Object) {
    for(i in obj){
      document.cookie = `${i}=${obj[i]}; expires=${expiresTime}`
    }
  }
}

// 获取 cookie
function getCookie(attr){
  return document.cookie.match(new RegExp('(^|\\s)'+ attr +'=([^;]+)(;|$)'))[2]
}

// 删除 cookie
function removeCookie(attr){
  const obj = {}
  obj[attr] = ''
  setCookie(obj, -1)
}
```


#### session
因为HTTP链接是无状态的，无法通过请求保留用户信息，所以引入了session机制。

鉴权流程
ClientA  --->  `第一次请求：username/password`  --->  Server  ---> `向用户A发放携带sessionId的cookie，记录认证状态` ---> ClientA --> `第二次请求：发送包含sessionId的cookie`--> Server ----> `服务端通过验证sessionId判断是那个用户`



#### token 
如果不用`session`如何确保数据是服务器生成的呢？怎样去验证呢？用户信息存在哪？于是有人想到用一定的加密规则生成字符串，服务器只验证不存储，只要验证通过说明是自己生成的，用户信息存储在加密字符串中。这样性能和`cors`都能解决。这个加密字符串就是`token`。引入`token`的意义是，因为session服务生成以后还要将生成的`sessionId`存储在内存中占用内存。所以引入了`token`，它的核心是在服务器收到用户名和密码后通过算法生成`token`返回给了客户端（服务器不记录token）,下次请求客户端只需要携带`token`来请求服务器，服务器收到`token`后通过算法验证“锁”和“钥匙”是否匹配。
https://www.bilibili.com/video/BV1tJ411B7yJ?p=3


#### cookie 和 session 区别 ？
cookie：客户端和服务器端都能操作，一般存放一些不明感的数据，数据类型只能是字符串或json

session：服务器端session，存放在服务器端。可以存放任意数据，session必须依赖cookie实现。



#### session 和 token 区别 ?
session: 服务器生成、存储、验证，以cookie方式传递给客户端，客户端以同样的方式传递给服务端。session有状态
token: 服务器生成、验证，以cookie或者请求头的方式传递给客户端，客户端以同样的方式发给服务端。token无状态

拓展视屏：https://www.bilibili.com/video/av81777533?from=search&seid=2712684165614512789