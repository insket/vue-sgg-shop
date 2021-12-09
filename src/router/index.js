import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {
  deleteToken
} from '@/utils/token'

Vue.use(VueRouter)

// 保存一份VueRouter原型对象的push方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace 解决push|replace多次点击报错问题
// 第一个参数是传递参数，往哪跳转  第二第三 成功失败的回调
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    originPush.call(this, location, reslove, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, reslove, reject) {
  if (reslove && reject) {
    originReplace.call(this, location, reslove, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

//路由配置
const routes = [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/page/Home'),
    meta: {
      isFooter: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/page/Login'),
    meta: {
      isFooter: false,
    },
  },
  {
    path: '/register',
    component: () => import('@/page/Register'),
    meta: {
      isFooter: false,
    },
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/page/Search'),
    meta: {
      isFooter: true,
    },
  },
  {
    path: '/detail/:skuId',
    name: 'detail',
    component: () => import('@/page/Detail'),
    meta: {
      isFooter: true,
    },
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/page/AddCartSuccess'),
    meta: {
      isFooter: true,
    },
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/page/ShopCart'),
    meta: {
      isFooter: true,
    },
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/page/Trade'),
    meta: {
      isFooter: true,
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/page/Pay'),
    meta: {
      isFooter: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('@/page/PaySuccess'),
    meta: {
      isFooter: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('@/page/Center'),
    meta: {
      isFooter: true,
    },
    children: [{
        path: 'myorder',
        name: 'myorder',
        component: () => import('@/page/Center/myOrder')
      },
      {
        path: 'grouporder',
        name: 'grouporder',
        component: () => import('@/page/Center/groupOrder')
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      },
    ]
  },
]

let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior() {
    return {
      y: 0,
    }
  },
})

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.loginAndRegister.userToken
  const userName = store.state.loginAndRegister.userInfo.name

  // 登录
  if (token) {
    // 登录则不能去login
    if (to.path === '/login' || to.path === '/register') {
      alert('已经登陆过了')
      next('/')
    } else {
      // 判断是否有用户信息
      if (userName) {
        next()
      } else {
        //登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
          await store.dispatch('getUserInfo');
          console.log('1');
          next();
        } catch (error) {
          //token失效从新登录
          await store.dispatch('userLogout');
          console.log('2');
          next('/login')
        }
      }
    }
  } else {
    let toPath = to.path
    // 需要登陆 的路径
    const needLogin = ['/trade', '/pay', '/center/myorder', '/center/grouporder']
    let path = needLogin.indexOf(toPath) !== -1
    if (path) {
      next('/login?redirect=' + toPath);
    }
    next()
  }
})

export default router