<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar title="首页" />
    <!-- /导航 -->
    <!-- Tab标签栏 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in list" :key="item.id" :title="item.name">标签{{item.id}}</van-tab>
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

<style>
</style>
