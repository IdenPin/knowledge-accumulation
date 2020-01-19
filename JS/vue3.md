### Vue3（vue2 + mobx + ts + rxjs）
vue3 舍弃了 `created` 和 `beforeCreated` 使用 `setup` 替换。其实这里还有一个核心概念，就是vue2.x大家用过可能都会明白，就是数据响应，以数据为中心。
也就是 `observe`, 这个 `observe` 的优势大家都能感觉到，就是方便，劣势就是性能，因为它本质来说就是所有东西我都监听，其实这在大型应用来说就比较不舒服，因为你控制不了，而且功能也比较多，消耗也就高。react 大家都知道，什么都不监听，除非你用第三方的比方说 `mobx` 这种的，其它的都必须手动的去 `setState`。

vue3 就是这两个方面的一个这种，这也就是 vue 官方说的，既能够保证监听，又可以在大型应用上性能也 ok 的，所以你需要自己去指定，这个要监听，那个不要监听。

#### reactive
```js
const { reactive } = Vue
var App = {
  template: `
    <div class="container">
      {{ msg }}
    </div>`,

  setup() {
    let data = reactive({
      msg: 'hello'
    })
    return {
      data
    }
  }
}
Vue.createApp().mount(App, '#app')
```
感觉麻烦，所有数据都需要手动来监听一下，你可以是直接在 `setup` return 出来的 json 外直接包一个 `reactive`, 这样也就回到了 vue2 的写法。比如：

```js
setup() {
  let data = {
    name: 'pdeng',
    age: 20
  }
  return reactive({
    data
  })
}
```
`reactive` 自带深度监听，json里有多少数组，都会监听的

#### ref 
ref 函数传入一个值作为参数，返回一个基于该值的响应式Ref对象，该对象中的值一旦被改变和访问，都会被跟踪到。这种新的写法，有点React Hooks 的写法。

```js
const { createApp, reactive } = Vue
// 计数器组件
const Counter = {
    template: `
        <div class="counter-display">
            <span class="counter-label">恭喜你，你已经写了</span>
            <span class="counter-text">{{ state.count }}</span>
            <span class="counter-label">斤代码！</span>
        </div>
        <div class="counter-btns">
            <button class="btn" @click="increase">写一斤</button>
            <button class="btn" @click="reset">删库啦</button>
        </div>
    `,
    setup() {
        const countOps = useCount()
        return { ...countOps }
    }
}

function useCount() {
    const state = reactive({ count: 0 })
    const increase = () => { state.count++ }
    const reset = () => { state.count = 0 }
    return { state, increase, reset }
}
```

那么有了 `reactive` 为什么还有引入 `ref` 呢？其实，是为了适应不同的编程风格有关。看下面例子：

```js
// 风格一：
let x = 0
let y = 0

function updatePos(e) {
  x = e.pageX
  y = e.pageY
}

// 风格二：
const pos = { x: 0, y: 0 }

function updatePos(e) {
  pos.x = e.pageX
  pos.y = e.pageY
}
```

使用 `ref` 和 `reactive` 来改写后

```js
// 风格一
const x = ref(0)
const y = ref(0)
const isDisplay = ref(false)

// 风格二
const state = reactive({
  x: 0,
  y: 0,
  isDisplay: false
})
```

#### 生命周期
在组件化的框架中，比如Angular、React或Vue，都为组件定义了生命周期这个概念，每个组件实例在被创建时都要经过一系列的初始化过程，例如：需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时，在这个过程中也会运行一些叫做生命周期钩子的函数，它们提供给用户在组件的不同阶段添加自己的代码的机会。

beforeCreate -> 请使用 setup()
created -> 请使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured
```js
const { onMounted } = Vue

const MyComp = {
    
    // Options API
    mounted() {
        console.log('>>>>>> mounted 1')
    },
    
    setup() {
        // Composition API
        onMounted(() => {
            console.log('++++++ mounted 2')
        })
    }
}
```

#### Vue2 和 Vue3 比较
而Vue3.0的写法称之为Composition Api。Vue2.x的写法被称之为Options API（可选项式API），我们在创建组件的时候，其实都是在拼装一个可选项集合，比如我们传入data、computed、methods、watch以及created、mounted等生命周期函数，用这个可选项集合来声明一个组件。 

这种方式的代码，组织良好，各个部分划分的比较清晰。但它也有缺点，就是这样的写法在逻辑复用上面不太友好。我们知道JS里最简洁、最清晰的复用方式就是将逻辑封装在一个个单纯的函数里，然后函数与函数之间互相调用。像上面这种嵌套对象的形式，复用性和优雅度就打了折扣。另外，以函数形式组织成的模块，在通过具名方式进行导入使用，在使用tree-shaking（摇树优化，可减小打包尺寸）的时候支持的更好，有更好的效果。下面是具名方式导入模块中的函数的例子，大家记得在编写代码的时候养成具名导入的好习惯：

```js
import { myFunc1, myFunc2 } from 'my-module'
```
再则，由于Vue3.0支持TypeScript，TypeScript很重要的一个特性就是可以进行类型推导，而函数天然对类型推导非常友好（至少比嵌套对象要好得多）。因此，像Composition API这种函数式的编程风格，成为了新框架的亮点，也可能是各个前端框架未来的主角。
```js
const { createApp, ref } = Vue

// 计数器组件
const Counter = {
    template: `
        <div class="counter-display">
            <span class="counter-label">恭喜你，你已经写了</span>
            <span class="counter-text">{{ count }}</span>
            <span class="counter-label">斤代码！</span>
        </div>
        <div class="counter-btns">
            <button class="btn" @click="increase">写一斤</button>
            <button class="btn" @click="reset">删库啦</button>
        </div>
    `,

    setup() {
        // 创建一个响应式的对象
        const count = ref(0)

        // 操作函数
        const increase = () => { count.value++ }
        const reset = () => { count.value = 0 }

        // 导出给模板访问
        return { count, increase, reset }
    }
}

```
我们观察到，data、methods部分都不见了，取而代之的是一个setup方法，它是Vue3.0中新增的组件入口，专为使用Composition API而设计，调用时机是在组件生命周期的 beforeCreate 和 created 之间（所以在 setup 里面是访问不了你所期望的 this 对象的，即它里面的this并不是指向当前组件，这点需要注意也尽量避免使用）。原先在 data 里的响应式对象属性 count 在这里成为了一个使用 ref 函数创建的响应式常量；而用于递增和重置这个 count 值的函数内部，不再需要通过 this 引用任何东西（也不推荐使用），这为我们进行进一步的重构提供了机会。我们可以把对 count 操作的业务逻辑独立提取出来：

```js
// 计数器组件
const Counter = {
    template: `
        <div class="counter-display">
            <span class="counter-label">恭喜你，你已经写了</span>
            <span class="counter-text">{{ count }}</span>
            <span class="counter-label">斤代码！</span>
        </div>
        <div class="counter-btns">
            <button class="btn" @click="increase">写一斤</button>
            <button class="btn" @click="reset">删库啦</button>
        </div>
    `,

    setup() {
        const countOps = useCount()
        return { ...countOps }
    }
}

// 对count值的操作逻辑
function useCount() {
    const count = ref(0)    
    const increase = () => { count.value++ }
    const reset = () => { count.value = 0 }
    return { count, increase, reset }
}
```
我们将 count 值操作逻辑都分离到了 useCount() 函数中，这种做法有利于拆分复杂的业务逻辑，让代码看起来更清晰，更好维护；在我们使用模块化机制的时候，更可以进一步把这些独立逻辑函数移入模块文件中，让每一部分的代码都变得更干净。