import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入模块
import home from './home'
import search from './search'
import detail from './detail'

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail
  }
})