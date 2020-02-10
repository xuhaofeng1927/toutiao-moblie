<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" fixed />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div class="message-item"
        :class="{ reverse: item.isMe }"
        v-for="(item,index) in messagelist"
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="title">
          <span>{{ item.msg }}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model="message" center clearable>
        <van-button slot="button" size="small" type="primary" @click="onSend">发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null, // WebSocket 通信对象
      messagelist: getItem('chat-messages') || [] // 接收消息的数组
    }
  },
  watch: {
    // 监听消息数据的变化进行本地存储
    messagelist (newvalue) {
      setItem('chat-messages', newvalue)
      // 让消息列表滚动到底部
      // 这里数据影响试图不是立即的
      this.$nextTick(() => {
        this.toBottom()
      })
    }
  },
  methods: {
    // 滚动到底部
    toBottom () {
      const listContainer = this.$refs['message-list']
      listContainer.scrollTop = listContainer.scrollHeight
    },
    onSend () {
      // console.log('发送事件')
      // 获取消息内容
      const message = this.message
      // 判断消息内容是否为空
      if (!message.length) {
        return // 消息如果为空则返回回去
      }
      // 封装要发送的内容
      const data = {
        isMe: true, // 我发送的标识
        msg: message, // 聊天输入内容
        timestamp: Date.now() // 聊天发送时间戳

      }
      // 发送消息
      this.socket.emit('message', data)
      // 将消息存储起来
      this.messagelist.push(data)
      // 消息清空
      this.message = ''
    }
  },
  created () {
    // 建立 WebSocket 连接
    // 这里的请求是 WebSocket 请求，和项目中的 axios 没有任何关系
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket // 通信对象负责
    socket.on('connect', function () {
      console.log('建立连接成功')
    })

    // 发送消息
    // socket.emit('消息类型', 消息内容)
    // 测试小技巧：手动将数据成员暴露到全局，就可以在控制台中直接访问了，测试完毕，删除代码
    // window.socket = socket
    // 接收消息
    // socket.on('消息类型', data => console.log(data))
    socket.on('message', result => {
      // console.log('message接收到消息为 ', result)
      // 将接收到的消息存储起来
      this.messagelist.push(result)
      // 将数据持久化
    })
  }
}
</script>

<style scoped lang="less">
.chat-container {
  font-size: 16px;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 46px 0 50px 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #f5f5f6;
  .message-list {
    height: 100%;
    overflow-y: scroll;
    .message-item {
      display: flex;
      align-items: center;
      padding: 10px;
      .title {
        background: #fff;
        padding: 5px;
        border-radius: 6px;
      }
      .avatar {
        margin-right: 5px;
      }
    }
    .reverse {
      flex-direction: row-reverse;
      .title {
        margin-right: 5px;
      }
    }
  }
  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
</style>
