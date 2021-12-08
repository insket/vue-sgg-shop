import { reqUserAdress, reqOrderInfo, reqSubmitOrder, reqPayment } from '@/api'
import router from '@/router'

const state = {
  userAddress: [], // 地址
  orderInfo: {}, // 商品清单
  data: '', //订单号
  payInfo: {} // 支付订单信息
}

const mutations = {
  GETUSERADDRESS(state, address) {
    state.userAddress = address
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  },
  GETSUBMITORDER(state, data) {
    state.data = data
  },
  GETPAYMENT(state, payInfo) {
    state.payInfo = payInfo
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
  },
  // 提交订单
  async getSubmitOrder({commit}, {tradeNo, data}) {
    const result = await reqSubmitOrder(tradeNo, data)
    if (result.code === 200) {
      commit('GETSUBMITORDER', result.data)
      router.push(`/pay?orderId=${result.data}`)
    } else {
      alert('提交失败')
    }
  },
  // 获取支付订单信息
  async getPayment({commit}, orderId) {
    const result = await reqPayment(orderId)
    console.log(result);
    if (result.code === 200) {
      commit('GETPAYMENT', result.data)
    } else {
      alert('请求失败')
    }
  },
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}