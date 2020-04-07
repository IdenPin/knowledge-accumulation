/**
 * JS 继承
 * JS 继承
 * https://mp.weixin.qq.com/s/ooOa37-g17q1ttwZ5wAlgA
 */

//  1. 原型链继承
//  1. 原型链继承
function Parent() {
  this.sex = '男'
}
Parent.prototype.getSex = function() {
  console.log('性别：', this.sex)
}

function Child() {
  this.name = '小沐'
}

/**
 * 误区不是赋值原型链 Child.prototype = Parent.prototype
 * 这样只能拿到 Parent 上的原型方法，拿不到 Parent 上的 sex
 * 总结-原型链继承
优点：
继承了父类的模板，又继承了父类的原型对象

缺点：
1、如果要给子类的原型上新增属性和方法，就必须放在Child.prototype = new Parent()这样的语句后面
2、无法实现多继承(因为已经指定了原型对象了)
3、来自原型对象的所有属性都被共享了，这样如果不小心修改了原型对象中的引用类型属性，那么所有子类创建的实例对象都会受到影响(这点从修改child1.colors可以看出来)
4、创建子类时，无法向父类构造函数传参数(这点从child1.name可以看出来) 
 */
Child.prototype = new Parent()
const child1 = new Child()
console.log(child1.getSex())



