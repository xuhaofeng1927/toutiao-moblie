<template>
  <div class="home">
      <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- tab-bar 标签栏 -->
  <van-tabbar route>
   <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item
        icon="user-o"
        to="/mine"
      >{{$store.state.user?'个人':'未登录'}}</van-tabbar-item>
</van-tabbar>
    <!-- /tab-bar 标签栏 -->
  </div>
</template>

<script>
export default {
  name: 'home'

}
</script>

<style>

</style>
