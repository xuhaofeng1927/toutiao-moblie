import axios from 'axios' // 引入 axios
import jsonBig from 'json-bigint' // 引入jsonBig
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 配置基础地址
})
request.defaults.transformResponse = [function (bigData) {
  try {
    // 现在我们定制使用 json-bigint 来帮我们处理转换原始的 JSON 格式字符串
    // 这个方法类似于 JSON.parse，只不过它能把数据中的超出 JS 安全整数范围的数字给处理成正确的
    // 它内部有自己的算法，它会把大数字转为一个对象，我们在使用的时候把对象.toString() 就得到字符串形式的 id 了
    // 如果转换成功则返回成功的结果给请求使用
    // 如果转换失败则进入 catch，返回一个空对象
    return jsonBig.parse(bigData) // 存在时执行
  } catch (error) {
    return {} // 不存在返回一个空数组
  }
}]
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 成功时执行代码
  // config 请求配置对象，我们可以通过修改 config 来实现统一请求数据处理
  const { user } = store.state

  // 统一添加 token
  if (user) {
    // config.headers 获取操作请求头对象
    // Authorization 是后端要求的字段名称
    // 数据值后端要求提供：Bearer token数据
    //    注意：Bearer 后面有个空格
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(
  // 响应成功 处理函数
  function (response) {
    return response
  },
  // 响应失败 处理函数
  async function (error) {
    if (error.response.status === 401 || error.response) {
      console.log('重新发送请求')
      // 检验是否有refresh_token
      const { user } = store.state
      // 如果没有则返回登录
      if (!user || !user.refresh_token) {
        redirectLogin()
      }
      try {
        //  // 这里为啥使用 axios 请求刷新 token？
      // 刷新 token 的接口要求把 refresh_token 放到请求头中，名字叫 Authorization
      // 如果我们使用 request 请求刷新 token，则会走 request 的请求拦截器，request 的请求拦截器中添加的是 token，不是 refresh_token
      // 如果 request 刷新 token 失败了，还会进入 request 自己的响应拦截器中，在这里会执行请求刷新 token 的操作
      // 而我们需要当刷新 token 失败之后直接跳转登录页，不需要在执行任何的处理了。
      // 所以：request 请求拦截器处理和响应拦截器不符合我们请求刷新 token 的要求，除非你在里面继续更多的判断逻辑
      // 重新用axios发送请求 请求头内容为refresh_token
        const { data } = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        console.log(data)
        // 3. 如果刷新 token 成功了，则把新的 token 更新到容器中
        store.commit('setuser', {
          ...user, // { id, token, refresh_token }
          token: data.data.token // 更新 token
        })
        // 把之前是失败的请求继续发出去
        return request.error.config
      } catch (error) {
        console.log('刷新token失败', error)
        redirectLogin()
      }
    }
    return Promise.reject(error)
  }
)
function redirectLogin () {
  // router.push('/login?redirect=' + router.currentRoute.fullPath)
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request //  导出新的axios
