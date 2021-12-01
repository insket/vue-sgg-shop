import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/page/Home')
    },
    {
      path: '/login',
      component: () => import('@/page/Login')
    },
    {
      path: '/register',
      component: () => import('@/page/Register')
    },
    {
      path: '/search',
      component: () => import('@/page/Search')
    }
  ]
})