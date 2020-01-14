<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar fixed>
      <span class="logo" slot="left">
        <img src="./logo-light.png" alt="">
      </span>
      <van-button type="info" slot="right" size="small" round icon="search" to="/search">
      搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航 -->
    <!-- Tab标签栏 -->
    <van-tabs v-model="active" swipeable>
      <van-icon class="wap-nav" slot="nav-right" name="wap-nav" @click="isChannelEditShow = true" />
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
      <Channels-list :Channelslist="Channelslist" :active="active" @switch="showSwitchChannels"></Channels-list>
      <!-- /频道编辑组件 -->
    </van-popup>
    <!-- /弹出框组件 -->
  </div>
</template>

<script>
import { getHomeUserChannels } from '@/api/channels' // 引入用户频道接口
import { getItem, setItem } from '@/utils/storage'
export default {
  data () {
    return {
      active: 0, // 控制标签页的激活项
      Channelslist: {},
      isChannelEditShow: false // 显示弹出框
    }
  },
  watch: {
    // 当 userChannels 发生改变的时候，将该数据存储到本地存储
    Channelslist () {
      setItem('user-channels', this.Channelslist)
    }
  },

  methods: {
    // 获取用户频道列表
    async getHomeUserChannels () {
      // 获取数据
      const { data } = await getHomeUserChannels()

      // 1. 定义一个变量用来存储频道列表
      let channels = []
      // 2. 获取本地存储的频道列表
      const localHomeUserChannles = getItem('user-channels')

      if (localHomeUserChannles) {
        // 如果本地存储有值使用本地存储的频道列表
        channels = localHomeUserChannles
      } else {
        // 如果本地存储没有值使用默认接口获取到的频道列表
        channels = data.data.channels
      }
      // 数据赋值
      this.Channelslist = channels
    },
    showSwitchChannels (index) {
      this.isChannelEditShow = false // 关闭弹窗
      // this.active = this.$store.state.index // 展示当前点击页面
      this.active = index // 展示当前点击页面
    }
  },
  created () {
    this.getHomeUserChannels()
  }
}
</script>

<style lang='less' scoped>
.home-container {
  .van-nav-bar {
    .logo {
      display: flex;
      margin-bottom:10px;
      width: 100px;
      height: 100%;
      img {
        width: 100%;
      }
    }
    .van-nav-bar__right {
      .van-button {
        width: 200px;
      }
      color: #fff;
      .van-icon {
        color: #fff;
      }
    }
  }
  padding-top: 90px;
  padding-bottom: 50px;
  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
    opacity: 0.8;
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
