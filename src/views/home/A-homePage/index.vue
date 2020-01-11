<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar title="首页" />
    <!-- /导航 -->
    <!-- Tab标签栏 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">内容 {{ index }}</van-tab>
    </van-tabs>
    <!-- /Tab标签栏 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0 // 控制标签页的激活项
    }
  }
}
</script>

<style>
</style>
