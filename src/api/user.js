// 用户登录注册涉及到的接口
import request from '@/utils/request-axios'

export const getUsersLogin = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post', // 请求方式
    data
  })
}
