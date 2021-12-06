import { reqCartList } from '@/api'

const state = {
  cartList: [] //购物车列表
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  // 获取 cartList 数据
  async getCartList({commit}) {
    const result = await reqCartList()
    commit('GETCARTLIST', result.data)
  }
}

const getters = {
  cartList({cartList}) {
    return cartList[0] || {};
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
}