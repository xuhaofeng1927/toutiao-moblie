import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入动态路由
import store from './store'
import './utils/register-vant' // 全局引入 封装注册的Vant 组件模块
import 'normalize.css' // 全局引入normalize.css
import 'amfe-flexible' // 全局引入 动态设置 REM 基准值
import './styles/index.less' // 全局引入配置样式
import './utils/validation' // 全局引入自定义校验
import Components from '@/components' // 全局引入封装的组件
Vue.config.productionTip = false
Vue.use(Components) // 注册封装组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
