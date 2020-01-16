import moment from 'moment'
import Vue from 'vue'

// 配置中文语言
moment.locale('zh-cn')
// 全局添加过滤器
// 转换相对时间
Vue.filter('Relativetime', value => {
  return moment(value).startOf('second').fromNow()
})
// 日期格式转换
Vue.filter('datetime', (value, format = 'YYYY-MM-DD  HH:mm:ss') => {
  moment(value).format(format)
})
