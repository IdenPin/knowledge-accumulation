### CSS 选择器

### 常用选择器

- \#id 
- .class
- div,p 选择所有 div 元素和 p 元素
- div p 选择 div 下面所有的 p 元素
- div > p 选择父元素为 div 的所有 p 元素
- div + p 选择紧接在 div 元素之后的所有 p 元素
- p~div 选择前面有 p 元素的每一个 div 元素
- p:empty 选择没有子元素的 p 元素
- div:not(p)  选择 div 元素下面不是 p 元素的每一个元素

### 结构伪类选择器

- E:first-child 匹配父元素中第一个子元素
- E:last-child 匹配父元素中最后一个子元素
- E:nth-child(n)匹配父元素中第n个子元素
- E:first-of-type 指定类型E的第一个
- E:last-of-type 指定类型E的最后一个
- E:nth-of-type(n)指定类型E的第n个
- E:nth-last-of-type(n)指定类型E的倒数第n个

**注意：of-type 选择指定类型的元素 nth-child 是从所有子集开始算的，可能不是同一种类型。n可以填写一些公式（n从0开始计算,关键词 even 和 odd）2n -> 偶数、2n+1 -> 奇数、 5n -> 5 10 15、 n+5 -> 从第五个开始包含第五个到最后、-n+5 -> 前五个（包含第五个）nth-of-type是指定同一种类型的子集**

### 类型选择器

- E[att] 选择所有具有att属性的E元素
- E[att=“val”] 选择属性值等于val的E元素
- E[att^=“val”] 选择具有att属性，且以val开头的E元素
- E[att$=“val”] 选择具有att属性，且以val结尾的E元素
- E[att*=“val”] 选择具有att属性，且值中含有val的E元素