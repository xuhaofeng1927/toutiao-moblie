import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'
Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import ('@/views/login') // 按需加载
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import ('@/views/user') // 按需加载
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search') // 按需加载
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '/', // 默认切换到首页
    component: () => import ('@/views/home'), // 按需加载
    children: [
      {
        path: '', // 默认子路由
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/A-homePage')
      },
      {
        path: 'question',
        name: 'question',
        component: () => import('@/views/home/B-question')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/home/C-video')
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/home/D-mine')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
