<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view></router-view>
    <div>测试样式设置</div>
    <div>
      测试图标字体
      <van-icon name="smile-o" />
      <van-icon name="fire-o" />
      <van-icon class-prefix="icont" name="abc" />
      <van-icon class-prefix="icont" name="icon-test" />
      <i class="iconfont icon-mingxinghuodong"></i>
    </div>
    <van-icon name="like-o" />
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import '@/styles/base.less'
export default {
  name: 'App'
}
</script>

<style>
</style>
