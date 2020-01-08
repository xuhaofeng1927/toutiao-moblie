import axios from 'axios' // 引入 axios
import jsonBig from 'json-bigint' // 引入jsonBig

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 配置基础地址
})
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data) // 存在时执行
  } catch (error) {
    return {} // 不存在返回一个空数组
  }
}]
export default request //  导出新的axios
