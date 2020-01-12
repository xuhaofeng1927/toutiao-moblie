import ArticleList from './article-list'
export default {
  install (Vue) {
    Vue.component('Article-list', ArticleList) // 全局封装组件
  }
}
