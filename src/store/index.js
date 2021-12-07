import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入模块
import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'
import loginAndRegister from './loginAndRegister'

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    cart,
    loginAndRegister
  }
})