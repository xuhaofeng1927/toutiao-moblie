/* eslint-disable vue/return-in-computed-property */

<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="openClose">{{isEditShow?'完成':'编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item v-for="(item,index) in Channelslist" :key="index" :text="item.name" @click="deleteChannels(index)">
        <van-icon v-show="isEditShow && index !== 0" slot="icon" name="close" />
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item,index) in remanentChannels"
        :key="index"
        :text="item.name"
        @click="onChannelAdd(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  props: ['Channelslist'], // 接收父组件传过来的属性值
  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false // 控制删除按钮的开关
    }
  },
  computed: {
    remanentChannels () {
      const { Channelslist, allChannels } = this // 获取用户列表和所有列表
      const channels = [] // 定义一个新的数组用来接收剩余频道
      // 推荐频道 = 所有频道 - 用户列表
      // remanentChannels = allChannels - Channelslist
      if (allChannels) {
        // 遍历所有频道
        allChannels.forEach(item => {
          if (!Channelslist.find(i => i.id === item.id)) {
            channels.push(item) // 遍历每一项不等与用户列表数据的值
          }
        })
        return channels // 返回获取到的剩余频道列表值
      } else {
        this.$toast('无法获取频道信息')
        return []
      }
    }
  },
  methods: {
    // 获取所有的频道数据
    async getAllChannels () {
      // 请求数据
      const { data } = await getAllChannels()
      // 获取数据
      this.allChannels = data.data.channels // 赋值给allChannels
    },
    // 推荐添加到我的频道
    onChannelAdd (params) {
      this.Channelslist.push(params) // 频道中添加要添加的频道
      // 不需要删除，我的频道改变，计算属性 recommendChannels 重新调用求值
    },
    // 控制删除开关的显隐
    openClose () {
      this.isEditShow = !this.isEditShow
    },
    // 当删除开关打开时（编辑状态）点击删除对应的元素
    deleteChannels (index) {
      if (this.isEditShow && index !== 0) {
        this.Channelslist.splice(index, 1) // 删除当前索引的值
      }
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 40px 18px 0;
  /deep/ .van-grid-item__icon-wrapper {
  position: absolute;
  top: -22px;
  right: -7px;
  .van-icon-close {
    font-size: 14px;
    color: red
  }
}
}
</style>
