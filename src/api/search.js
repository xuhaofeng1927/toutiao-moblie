/**
 * 获取搜索接口
 */

import request from '@/utils/request-axios'

// 联想记忆搜索接口
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 输入关键字搜索结果接口
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
