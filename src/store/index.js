import Vue from 'vue'
import Vuex from 'vuex'
import decodeJwt from 'jwt-decode'
import { getItem, setItem } from '@/utils/storage'
const USER_TOK = 'user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_TOK) // 获取token数据
  },
  mutations: {
    setuser (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id // 解析Token 获取用户id
      }
      state.user = data
      setItem(USER_TOK, state.user) // 存储token数据
    }
  },
  actions: {
  },
  modules: {
  }
})
