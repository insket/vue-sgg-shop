// search 模块
import { reqSearchList } from '@/api'

const state = {
  searchList: {} // 搜索数据
}

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}

const actions = {
  // 请求 searchList 数据
  async getSearchList({ commit }, data={}) {
    const result = await reqSearchList(data)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}

const getters = {
  goodsList({ searchList }) {
    return searchList.goodsList
  },
  trademarkList({ searchList }) {
    return searchList.trademarkList
  },
  attrsList({ searchList }) {
    return searchList.attrsList
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}