import { reqRegisterCode, reqUserRegister, reqUserLogin, reqUserInfo } from '@/api'
import router from '@/router'

const state = {
  code: '', // 验证码
  userToken: '', // 用户token
  userInfo: {} // 用户信息
}

const mutations = {
  GETREGISTERCODE(state, code) {
    state.code = code
  },
  GETUSERLOGIN(state, token) {
    state.userToken = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // 获取验证码
  async getRegisterCode({commit}, phone) {
    const result = await reqRegisterCode(phone)
    commit('GETREGISTERCODE', result.data)
  },
  // 注册
  async getUserRegister({commit}, user) {
    const result = await reqUserRegister(user)
    console.log(result);
    if (result.code === 200) {
      router.push('/login')
    } else {
      alert(result.message)
    }
  },
  // 登录
  async getUserLogin({commit}, user) {
    const result = await reqUserLogin(user)
    if (result.code === 200) {
      commit('GETUSERLOGIN', result.data.token)
      router.push('/home')
    } else {
      alert(result.message)
    }
  },
  // 获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
    }
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