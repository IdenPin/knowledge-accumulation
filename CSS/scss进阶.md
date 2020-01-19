### Sass 进阶
Sass基本数据类型和各类型的原生方法
#### 数据类型
- 数字：1，2，3，11，10px (可以带单位)
- 字符串："pdeng",'asd',asd (有引号和无引号都是字符串类型)
颜色：blue, #fff, rgba(0,0,0,1);
- 布尔值：true,false 
- 空值：null
- 数组：10px 10px 10px 10px 或者 10px,10px,10px,10px 最好用括号"()"包起 来区分数据类型 如(10px,10px,10px,10px)
- maps：(key1:value1 , key2:value2)  类似js的Map数据结构，可以用Object来理解 竟然和js的Map数据结构相识，其值的获取和添加都是用函数来处理的

扩展阅读: `http://sass-lang.com/documentation/Sass/Script/Functions.html#list_separator-instance_method`

#### Sass一些原生数据类型的方法

- List类型的方法：
length($list) ：返回数组的长度
nth(𝑙𝑖𝑠𝑡,index) : 根据𝑖𝑛𝑑𝑒𝑥来获取数组list的元素
set-nth(𝑙𝑖𝑠𝑡,index,𝑣𝑎𝑙𝑢𝑒):根据index来替换数组𝑙𝑖𝑠𝑡中原来的值为value
join(𝑙𝑖𝑠𝑡1,list2,) : 将2个数组合并成一个数组 join((1px,1px),(2px,2px)) => (1px,1px,2px,2px)
append(𝑙𝑖𝑠𝑡,vlaue) : 给数组添加值类似js数组的push
zip($lists...) : 主要作用如 zip( (a,b,c) , (1,2,3) , ("a","b","c") , (1px,2px,3px)) => ( (a,1,"a",1px) , (b,2,"b",2px) , (c,3,"c",3px))
index(𝑙𝑖𝑠𝑡,value) : 根据值来查找index

 
- Maps类型的方法：
map-get(𝑚𝑎𝑝,key) : 根据键名获取值
map-merge(𝑚𝑎𝑝1,map2) : map合并，如果𝑚𝑎𝑝2的属性和map1的相同，会用𝑚𝑎𝑝2的替换掉map1的，不相同的属性只是添加，然后返回一个新的map类型的数据
map-remove(𝑚𝑎𝑝,keys...) : 根据键名 来删除map结构的值 ，支持传入多个键名，一次删除多个
map-keys($map) : 相当于js 中的Object.keys
map-values($map) ： 相当于js中的Object.values
map-has-key(𝑚𝑎𝑝,key) :判断𝑚𝑎𝑝是否有key这一属性

 
- 数字类型的方法：
percentage($number) : 将一数字类型转为带百分数 如 percentage(0.1) => 10% percentage(10) => 1000%
round($number) : Math.round
ceil($number) : Math.ceil
floor($number) : Math.floor
abs($number) :Math.abs
min($number): Math.min
max($number):Math.max
random(): Math.random


- 字符串类型的方法：
unquote($str) : 去掉引号 unquote("asd") => asd
quote($str) : 添加引号 quote(asd) => "asd"
str-length($str) : "asd".length
str-insert(𝑠𝑡𝑟,insert,𝑖𝑛𝑑𝑒𝑥):根据index,把𝑖𝑛𝑠𝑒𝑟𝑡插入到str中$index的后面
str-index(𝑠𝑡𝑟,subString) : 根据𝑠𝑢𝑏𝑆𝑡𝑟𝑖𝑛𝑔查找subString在$str那个位置 返回index 参考js 的 String.prototype.indexOf
str-slice(𝑠𝑡𝑟,start,$end) : 参考js 的 slice
to-upper-case($str) : 转为大写字符
to-lower-case($str) :转为小写字符
 

- 还有一些封装的有用的函数：
comparable(𝑛𝑢𝑚1,num2) :判断两个数字类型能否进行四则运算和比较
unit($number) ：返回一个数字类型的单位 如unit(10px) => "px" unit(10) => "" 就是获取单位
unitless($number) : 判断是不是数字类型，不管有没有单位返回true或者false
type-of($value) : 返回传入的数据的类型 相当于js中的 typeof
if(𝑐𝑜𝑛𝑑𝑖𝑡𝑖𝑜𝑛,if-true,$if-false) : 相当于三元运算符  condition ?  true : false   如 if(true,1px,2px) => 1px
