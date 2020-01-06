import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    addcount (state, n) {
      state.count += n
    },
    subcount (state, m) {
      state.count -= m.b
    }
  },
  actions: {
    delaycout (context, n) {
      setTimeout(() => {
        // 提交 mutation 更新 state
        context.commit('addcount', n)
      }, 1000)
    }
  },
  modules: {
  }
})
