<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar title="首页" fixed  />
    <!-- /导航 -->
    <!-- Tab标签栏 -->
    <van-tabs v-model="active" swipeable >
      <van-tab v-for="(item,index) in list" :key="index" :title="item.name">
        <Article-list :channel="item"></Article-list>
      </van-tab>
    </van-tabs>
    <!-- /Tab标签栏 -->
  </div>
</template>

<script>
import { getHomeUserChannels } from '@/api/channels' // 引入用户频道接口
export default {
  data () {
    return {
      active: 0, // 控制标签页的激活项
      list: {}
    }
  },
  methods: {
    // 获取用户频道列表
    async getHomeUserChannels () {
      // 获取数据
      const { data } = await getHomeUserChannels()
      // 数据赋值
      this.list = data.data.channels
    }
  },
  created () {
    this.getHomeUserChannels()
  }
}
</script>

<style lang='less' scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap { // 深度调整根组件内部标签样式
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
