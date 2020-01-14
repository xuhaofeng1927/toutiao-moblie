import ArticleList from './article-list'
import channelsList from './channels-list'
import searchResult from './search-result'
export default {
  install (Vue) {
    Vue.component('Article-list', ArticleList) // 全局封装组件
    Vue.component('Channels-list', channelsList) // 全局封装组件
    Vue.component('Search-result', searchResult) // 全局封装组件
  }
}