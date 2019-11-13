## Transition（过渡）

### transition：

简写：transition：property duration timing-function delay;

property 设置过渡效果的CSS名称

duration 完成过渡效果需要多少秒或毫秒

function 速度效果曲线

delay 过渡效果何时开始

##  Transform 图形转换（变形）

可实现元素的移动、旋转、缩放等效果

### transform：

- translate

  最大的优点是，不会影响到其它元素的位置，translate 百分比单位是相对自身元素的。

  `transform: translate(50%, 50%)`

```css
transform: translate(x, y);
transform: translateX(x);
transform: translateY(y);
```

- rotate

  正值是顺时针，负值是逆时针

```css
transform: rotate(45deg);
transform: rotate(0.45return)
```

- scale

  x, y 缩放的宽高比例，默认不带单位。如果 x 和 y 只写一个参数就代表等比例缩放。

  scale 最大优势是可以设置转换中心点缩放，默认以中心点缩放。而且影响其它盒子

```css
transform: scale(x, y);
transform: scaleX();
transform: scaleY();
```

- skew

  x, y 倾斜角度

```css
transform: skewX(45deg);
transform: skewY(45deg)
transform: skew(x,y)
```

### transform-origin：

更改一个元素变形的原点

- x y z

  x 和 y 可取值 top, bottom, left, righ

  `transform-origin: 50% 50%`

```css
transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
transform: translate(12px, 50%);
transform: translateX(2em);
transform: translateY(3in);
transform: scale(2, 0.5);
transform: scaleX(2);
transform: scaleY(0.5);
transform: rotate(0.5turn);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);
transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: perspective(17px);

transform: translateX(10px) rotate(10deg) translateY(5px);
```

**注意：综合写法transform: translate(x, y) rotate(xdeg) scale(x,y),顺序会影响动画效果。当同时有位移和其它属性的时候，记得将位移放到最前。**

## Animation 动画

- animation-name 动画名称

- animation-duration 动画持续时间

- animation-timing-function 动画速度曲线

  默认是 ease，可取 liear、ease、ease-in、ease-out、ease-in-out、steps(n) n数字步长

- animation-delay 动画何时开始，延迟执行时间

- animation-iteration-count 规定动画播放次数，默认是1，还有infinite

- animation-direction 规定动画在下一个周期是否逆向播放，默认是 normal，alternate 逆向播放

- animation-paly-state 规定动画运行或暂停，默认是running，还有暂停 paused

- animation-fill-mode 规定动画结束后状态，保持 forwards 回到起始 backwards

动画序列：使用 to ~ from 或 0 ~ 100

```css
@keysframe move{
  to {
    width: 100px;
  }
  from{
    width: 200px;
  }
}
```

动画简写：

animation: 动画名、持续时间、运动曲线、合适开始、播放次数、是否反方向、动画起始或着结束的状态

animation: @keysframe 名称 3s linear 2s infinite alternate

**注意点：简写属性不包含animation-play-state，简写动画名称和持续时间不能省略。想要动画走回来，而不是直接跳回来可以是使用 animation-direction: alternate。盒子动画结束后，停在结束位置可以使用 animation-fill-mode: forwards。animation多个动画用逗号隔开**



