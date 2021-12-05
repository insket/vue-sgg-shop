import { reqGoodList } from '@/api'

const state = {
  goods: {}
}

const mutations = {
  GETGOODSLIST(state, goods) {
    state.goods = goods
  }
}

const actions = {
  // 获取商品详情
  async getGoodsList({commit}, skuId) {
    const result = await reqGoodList(skuId)
    commit('GETGOODSLIST', result.data)
  }
}

const getters = {
  categoryView({goods}) {
    return goods.categoryView || {}
  },
  skuInfo({goods}) {
    return goods.skuInfo || {}
  },
  spuSaleAttrList({goods}) {
    return goods.spuSaleAttrList || []
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
}