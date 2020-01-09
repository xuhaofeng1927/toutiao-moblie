import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
const USER_TOK = 'user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_TOK) // 获取token数据
  },
  mutations: {
    setuser (state, data) {
      state.user = data
      setItem(USER_TOK, state.user) // 存储token数据
    }
  },
  actions: {
  },
  modules: {
  }
})
