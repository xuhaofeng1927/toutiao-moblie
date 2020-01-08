import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'
Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import ('@/views/login') // 按需加载
  },
  {
    path: '/home',
    component: () => import ('@/views/home') // 按需加载
  }
]

const router = new VueRouter({
  routes
})

export default router
