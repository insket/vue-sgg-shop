// home 模块
import { reqCateGoryList, reqBannerList, reqFloorList } from '@/api'

const state = {
  category: [], // 三级联动数据
  banners: [], // 轮播图数据
  floors: [] // floor数据
}

const mutations = {
  CATEGORYLIST(state, categorylist) {
    state.category = categorylist
  },
  BANNERLIST(state, banners) {
    state.banners = banners
  },
  FLOORLIST(state, floors) {
    state.floors = floors
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
  // 请求 floor 数据
  async floorList ({commit}) {
    const result = await reqFloorList()
    if(result.code === 200) {
      commit('FLOORLIST', result.data)
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