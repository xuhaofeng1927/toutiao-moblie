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
