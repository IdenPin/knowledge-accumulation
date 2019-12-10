
### 矢量图
栅格图形的工作就像是描述哪个方格应该填充什么颜色，而矢量图形的工作则像是描述要绘制从某个点到另一个点的直线或曲线

#### 创建 SVG 图像
```js
<svg width='140' heiight='170' xmlns='http://wwww.w3.org/2000/svg'>
  <title>Cat</title>
  <desc>Stick Figure of Cat</desc>
  <!-- 在这里绘制图像 -->
</svg>
```


#### 基本图形
`<rect>`、`<circle>`、`<ellipse>`、`<line>`、`<polyline>`、`<polygon>`

#### 基本属性
`fill`、`stroke`、`stroke-width`、`transform`



```js
<svg width='140' heiight='170' xmlns='http://wwww.w3.org/2000/svg'>
  <title>Cat</title>
  <desc>Stick Figure of Cat</desc>
  <!-- 在这里绘制图像 -->
  <circle cx='70' cy='95' r='50' style='stroke:black; fill:none'></circle>
  <circle cx='55' cy='80' r='5' stroke='black' fill='#3339933'></circle>
  <circle cx='85' cy='80' r='5' stroke='black' fill='#3339933'></circle>
</svg>
```
#### 形状颜色
```js
线段：<line x1=" " y1=" " x2=" " y2=" " style=" "/>
矩形：<rect x=" "  y=" "  width=" "  height=" "  style=" "/>
圆角矩形：<rect x=" "  y=" "  rx=" "  ry=" "  style=" "/>
圆形：<circle cx=" "  cy=" "  r=" " style=" "/>
椭圆形：<ellipse cx=" "  cy=" "  rx=" "  ry=" "  style=" " />
多边形：<polygon points="      "  style=" "/>
折线：<polyline points="    "  style=" "/> //注意需把fill设成none
```