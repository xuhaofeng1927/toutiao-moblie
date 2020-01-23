<template>
  <div class="reply-comment">
    <van-nav-bar :title="`${comment.reply_count}条回复`" @click-left="$emit('onClickClose')">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <Comment-detail :comment="comment"></Comment-detail>
    <van-cell title="所有评论" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <Comment-detail :comment="comment" v-for="(comment,index) in list" :key="index"></Comment-detail>
    </van-list>

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        color="#e5645f"
        name="good-job"
      />
    </div>
    <!-- /底部区域 -->
      <!-- 发表文章评论框弹出 -->
    <van-popup v-model="isPostShow" position="bottom" :style="{ height: '18%' }">
      <Post-comment v-model="postMessage"></Post-comment>
    </van-popup>
    <!-- /发表文章评论框弹出 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'replyComment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isPostShow: false, // 回复评论弹层
      postMessage: ''
    }
  },
  methods: {
    // 展示回复列表
    async onLoad () {
      // 1,请求获取列表数据
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      const { results } = data.data
      // 2，将数据添加到列表
      this.list.push(...results)
      // 3，关闭loading
      this.loading = true
      // 4，判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    // 发表文章（对一级回复）评论
    onPost () {

    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: white;
  .van-nav-bar__title {
    color: rgb(0, 153, 255);
  }
}
 .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
  }
</style>
