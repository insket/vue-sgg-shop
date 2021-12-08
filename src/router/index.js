import Vue from 'vue';
import VueRouter from 'vue-router'
import store from '@/store'
import {deleteToken} from '@/utils/token'

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
    path: '/detail/:skuId',
    name: 'detail',
    component: () => import('@/page/Detail'),
    meta: {
      isFooter: true
    }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/page/AddCartSuccess'),
    meta: {
      isFooter: true
    }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/page/ShopCart'),
    meta: {
      isFooter: true
    }
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/page/Trade'),
    meta: {
      isFooter: true
    }
  } 
]

let router =  new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior () {
    return {y: 0}
  }
})

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.loginAndRegister.userToken
  const userInfo = store.state.loginAndRegister.userInfo.name
  // 登录
  if (token) {
    // 登录则不能去login
    if (to.path === '/login' || to.path === '/register') {
      alert('已经登陆过了')
      next('/home')
    } else {
      // 判断是否有用户信息
      if (userInfo) {
        next()
      } else {
        // deleteToken()
        await store.dispatch('getUserInfo')
        next()
      }
    }
  } else {
    next()
  }

})

export default router