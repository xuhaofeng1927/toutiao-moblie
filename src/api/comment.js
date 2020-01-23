/**
 * 获取评论接口
 */

import request from '@/utils/request-axios'

// 获取文章评论或评论回复
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 添加评论接口
export const addComments = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/comments',
    data
  })
}

// 评论点赞
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消评论点赞
export const cancelCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
