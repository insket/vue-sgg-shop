import { reqCartList, reqDeleteCart, reqCheckStatus } from '@/api'

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
  },
  // 删除购物车商品
  async deleteCart({commit}, skuId) {
    const result = await reqDeleteCart(skuId)
    console.log(result);
  },
  // 切换商品选中状态
  async changeCheckedStatus({commit}, {skuId, isChecked}) {
    const result = await reqCheckStatus(skuId, isChecked)
  },
  // 删除全部选中商品
  deleteAllChecked({dispatch, getters}) {
    let PrmoseAll = []
    // 获取购物车中全部商品
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = item.isChecked === 1 ? dispatch('deleteCart', item.skuId) : ''
      PrmoseAll.push(promise)
    })
    return Promise.all(PrmoseAll)
  },
  // 全选 / 全不选
  updataIsAllChecked({dispatch, getters},checked) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = dispatch('changeCheckedStatus', {skuId: item.skuId, isChecked: checked})
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
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