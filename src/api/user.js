// 用户登录注册涉及到的接口
import request from '@/utils/request-axios'

// 用户登录接口
export const getUsersLogin = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post', // 请求方式
    data
  })
}
// 获取验证码接口
export const getverity = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'get' // 请求方式
  })
}
// 获取个人信息接口
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'get' // 请求方式
  })
}

// 获取用户信息接口
export const getAutherUserInfo = (id) => {
  return request({
    url: `/app/v1_0/users/${id}`,
    method: 'get'// 请求方式
  })
}

// 获取个人用户信息
export const getPersonUserxInfo = () => {
  return request({
    url: `/app/v1_0/user/profile`,
    method: 'get'// 请求方式
  })
}

// 获取用户资料
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}

// 更新用户资料
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
