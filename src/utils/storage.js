/**
 * 封装操作本地存储的工具方法模块
 */
// 存储token数据
export const setItem = (name, item) => {
  const data = typeof item === 'object' // 判断数据是否为对象
    ? JSON.stringify(item) // 是转成json字符串
    : item // 不是输出原结果
  return window.localStorage.setItem(name, data)
}
// 获取token数据
export const getItem = name => {
  const data = window.localStorage.getItem(name) // 根据名字获取本地存储数据
  try {
    return JSON.parse(data)
  } catch (error) {
    console.log('转换失败', error)
    return data
  }
}
// 移除token数据
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
