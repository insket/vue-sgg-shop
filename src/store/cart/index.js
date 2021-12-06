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
  async getCartList({commit}) {
    const result = await reqCartList()
    commit('GETCARTLIST', result.data)
  }
}

const getters = {
}


export default {
  state,
  mutations,
  actions,
  getters,
}