import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant' // 全局引入 封装注册的Vant 组件模块
import 'normalize.css' // 全局引入normalize.css
import 'amfe-flexible' // 全局引入 动态设置 REM 基准值
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
