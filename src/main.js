import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

// 注册全局组件 -- 三级联动
import TypeNav from '@/page/Home/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
