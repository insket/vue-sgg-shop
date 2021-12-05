import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 保存一份VueRouter原型对象的push方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace 解决push|replace多次点击报错问题
// 第一个参数是传递参数，往哪跳转  第二第三 成功失败的回调
VueRouter.prototype.push = function(location, reslove, reject) {
  if (reslove && reject) {
    originPush.call(this, location, reslove, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function(location, reslove, reject) {
  if (reslove && reject) {
    originReplace.call(this, location, reslove, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

//路由配置
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/page/Home'),
    meta: {
      isFooter: true
    }
  },
  {
    path: '/login',
    component: () => import('@/page/Login'),
    meta: {
      isFooter: false
    }
  },
  {
    path: '/register',
    component: () => import('@/page/Register'),
    meta: {
      isFooter: false
    }
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/page/Search'),
    meta: {
      isFooter: true
    }
  },
  {
    path: '/detail/:skuid',
    name: 'detail',
    component: () => import('@/page/Detail'),
    meta: {
      isFooter: true
    }
  }
]

export default new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior () {
    return {y: 0}
  }
})