import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// 引入mock数据
import '@/mock/mockServer'
import 'swiper/css/swiper.css'

// 注册 elementui
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 注册全局组件 -- 三级联动组件
import TypeNav from '@/components/TypeNav'
import Banner from '@/components/Banner'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Banner.name, Banner)
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  beforeMount() {
    Vue.prototype.$bus = this;
  },
  router,
  store
}).$mount('#app')
