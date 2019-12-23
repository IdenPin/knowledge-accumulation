import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'lib-flexible'
// import 'bulma/css/bulma.css'
// import ViewUI from 'view-design'
import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.use(Ant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
