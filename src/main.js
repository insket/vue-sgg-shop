import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// 引入mock数据
import '@/mock/mockServer'
import DefaultImg from '@/assets/images/121.jpg'
import 'swiper/css/swiper.css'

// 注册 elementui
import { Button, MessageBox } from 'element-ui';
// 注册全局组件 -- 三级联动组件
import TypeNav from '@/components/TypeNav'
import Banner from '@/components/Banner'
import Pagination from '@/components/Pagination'
// vue-loading
import VueLazyLoad from 'vue-lazyload'
// 引入表单校验插件
import '@/plugins/validata'

Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.component(TypeNav.name, TypeNav)
Vue.component(Banner.name, Banner)
Vue.component(Pagination.name, Pagination)

Vue.use(VueLazyLoad, {
  // 懒加载默认图片
  loading: DefaultImg
})

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  beforeMount() {
    Vue.prototype.$bus = this;
  },
  router,
  store
}).$mount('#app')
