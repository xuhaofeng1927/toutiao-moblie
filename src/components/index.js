import ArticleList from './article-list'
import channelsList from './channels-list'
import searchResult from './search-result'
import articleComment from './article-comment'
import commentDetail from './comment-detail'
import PostComment from './Post-comment'
export default {
  install (Vue) {
    Vue.component('Article-list', ArticleList) // 全局封装组件
    Vue.component('Channels-list', channelsList) // 全局封装组件
    Vue.component('Search-result', searchResult) // 全局封装组件
    Vue.component('Article-comment', articleComment) // 全局封装组件
    Vue.component('Comment-detail', commentDetail) // 全局封装组件
    Vue.component('Post-comment', PostComment) // 全局封装组件
  }
}
