<template>
  <div>
    hello computed .
    <div>
      <input type="text" v-model="inputVal" placeholder="input some ..." style="width:200px;padding:5px;border-radius:4px;border:1px solid #ccc">
      <br>
      {{inputVal}}
      <br>
      {{compInputVal}}
    </div>
   <input type="text" v-model="obj.a.name">
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '我是msg消息。',
      inputVal: '',
      obj: {
        a: {
          name: 'pdeng'
        }
      }
    }
  },
  // { [key: string]: Function | {get: Function, set: Function} }
  computed: {
    // compInputVal() {
    //   window.console.log('compInputVal')
    //   return this.inputVal && this.inputVal + '计算后的。'
    // }
    compInputVal: {
      get() {
        return this.inputVal && this.inputVal + '来 computed 一下'
      }
    }
  },
  mounted() {
    this.doTest1()
  },
  // { [key: string]: string | Function | Object | Array }
  watch: {
    // inputVal: 'watchInputValFn'
    // inputVal(newVal, oldVal) {
    //   window.console.log(`我是新值：${newVal}`, `我是老值：${oldVal}`)
    // }
    // inputVal: {
    //   handler: 'watchInputValFn',
    //   immediate: true
    // }
    // 'obj.a.name': {
    //   handler: 'watchInputValFn',
    //   immediate: true,
    //   deep
    // },
    inputVal: [
      function(newVal, oldVal) {
        window.console.log(`我是新值：${newVal}`, `我是老值：${oldVal}`)
      }
    ]

  },
  methods: {
    doTest1() {
      window.console.log('%c','color:red','doTest1')
    },
    watchInputValFn(newVal, oldVal) {
      window.console.log(`我是新值：${newVal}`, `我是老值：${oldVal}`)
    }
// ├── element-ui.scss
// ├── hack.scss
// ├── index.scss
// ├── laytpl.scss
// ├── mixin.scss
// ├── nprogress.scss
// ├── resize.scss
// ├── sidebar.scss
// ├── transition.scss
// └── variables.scss
  },
}
</script>