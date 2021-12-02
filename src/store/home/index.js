// home 模块
import { reqCateGoryList, reqBannerList } from '@/api'

const state = {
  category: [], // 三级联动数据
  banners: [] // 轮播图数据
}

const mutations = {
  CATEGORYLIST(state, categorylist) {
    state.category = categorylist
  },
  BANNERLIST(state, banners) {
    state.banners = banners
  },
}

const actions = {
  // 请求 category 数据
  async categoryList ({commit}) {
    const result = await reqCateGoryList()
    if(result.code === 200) {
      // result.data.pop()
      commit('CATEGORYLIST', result.data)
    }
  },
  // 请求 banners 数据
  async bannerList ({commit}) {
    const result = await reqBannerList()
    if(result.code === 200) {
      commit('BANNERLIST', result.data)
    }
  },
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}