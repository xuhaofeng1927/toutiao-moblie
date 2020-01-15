// 用户获取文章涉及到的接口
import request from '@/utils/request-axios'

// 获取用户列表接口
export const getArticlesUserInfo = (id, params) => {
  return request({
    url: `/app/v1_0/users/${id}/articles`,
    method: 'get', // 请求方式
    params
  })
}

// 获取频道标签列表
export const getChannelsArticles = params => {
  return request({
    url: `/app/v1_1/articles`,
    method: 'get', // 请求方式
    params
  })
}

// 根据 id 获取指定文章
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 收藏文章
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const cancelCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}
