<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar title="首页" fixed />
    <!-- /导航 -->
    <!-- Tab标签栏 -->
    <van-tabs v-model="active" swipeable>
      <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
      <van-tab v-for="(item,index) in Channelslist" :key="index" :title="item.name">
        <Article-list :channel="item"></Article-list>
      </van-tab>
    </van-tabs>
    <!-- /Tab标签栏 -->
    <!-- 弹出框组件 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      round
      closeable
      close-icon="close"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
    <!-- 频道编辑组件 接收父组件传过来的值Channelslist-->
    <Channels-list :Channelslist='Channelslist'></Channels-list>
    <!-- /频道编辑组件 -->
    </van-popup>
    <!-- /弹出框组件 -->
  </div>
</template>

<script>
import { getHomeUserChannels } from '@/api/channels' // 引入用户频道接口
export default {
  data () {
    return {
      active: 0, // 控制标签页的激活项
      Channelslist: {},
      isChannelEditShow: false // 显示弹出框
    }
  },
  methods: {
    // 获取用户频道列表
    async getHomeUserChannels () {
      // 获取数据
      const { data } = await getHomeUserChannels()
      // 数据赋值
      this.Channelslist = data.data.channels
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
  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
    opacity: .8;
    font-size: 24px;
    padding-right: 5px;
}
  /deep/ .van-tabs__wrap {
    // 深度调整根组件内部标签样式
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
