/**
 * 获取频道列表接口
 * 如果登录了：获取用户频道列表
 * 没有登录：获取默认推荐的频道列表
 */
import request from '@/utils/request-axios'

// 获取用户频道接口
export const getHomeUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
