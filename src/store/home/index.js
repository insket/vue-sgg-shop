// home 模块
import { reqCateGoryList } from '@/api'

const state = {
  category: [] // 三级联动数据
}

const mutations = {
  CATEGORYLIST(state, categorylist) {
    state.category = categorylist
  }
}

const actions = {
  // 请求 category 数据
  async categoryList ({commit}) {
    const result = await reqCateGoryList()
    if(result.code === 200) {
      // result.data.pop()
      commit('CATEGORYLIST', result.data)
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}