### 优化点
1. 如果是视网膜屏幕，可以降低设备分辨率
```js
var chart = echarts.init(document.querySelector('#main'), null, {
  devicePixelRatio: 1
})
```
2. 设置分组分层
```js
option.geo.zlevel = 1
option.series.forEach((s, index) => {
  s.zlevel = index + 2
  if(s.effect) {
    s.effect.zlevel = index + option.series.length + 2
  }
  if(s.rippleEffect) {
    s.rippleEffect.zlevel = index + option.series.length + 2
  }
})
```

3. 不要把 echarts 的 instance 实例放入 data 中
```js
data() {
  return {
    // chart: null
    options: null
  }
}

```