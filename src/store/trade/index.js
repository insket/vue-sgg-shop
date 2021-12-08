import { reqUserAdress, reqOrderInfo } from '@/api'

const state = {
  userAddress: [], // 地址
  orderInfo: {} // 商品清单
}

const mutations = {
  GETUSERADDRESS(state, address) {
    state.userAddress = address
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  },
}

const actions = {
  // 获取用户地址信息
  async getUserAddress({commit}) {
    const result = await reqUserAdress()
    if (result.code === 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  // 获取商品清单
  async getOrderInfo({commit}) {
    const result = await reqOrderInfo()
    if (result.code === 200) {
      commit('GETORDERINFO', result.data)
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}