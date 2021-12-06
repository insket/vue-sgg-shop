import getUUID from '@/utils/uuid_token'
import { reqGoodList, reqAddOrUpdataShopCart } from '@/api'
import router from '@/router'

const state = {
  goods: {}, //商品列表
  uuid_token: getUUID()  // uuid
}

const mutations = {
  GETGOODSLIST(state, goods) {
    state.goods = goods
  },
}

const actions = {
  // 获取商品详情
  async getGoodsList({commit}, skuId) {
    const result = await reqGoodList(skuId)
    commit('GETGOODSLIST', result.data)
  },
  // 将商品添加购物车
  async addOrUpdataShopCart({commit}, {skuId, skuNum, skuInfo}) {
    const result = await reqAddOrUpdataShopCart(skuId, skuNum)
    if(result.code === 200) {
      // 将 商品信息存储到sessionStorage中
      sessionStorage.setItem('skuInfo', JSON.stringify(skuInfo))
      router.push({name: 'addcartsuccess', query:{skuNum}})
    } else {
      alert('添加失败,请重试')
    }
  },
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