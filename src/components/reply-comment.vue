<template>
  <div class="reply-comment">
    <van-nav-bar title="0条回复" @click-left="$emit('onClickClose')">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <Comment-detail :comment="comment"></Comment-detail>
    <van-cell title="所有评论" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <Comment-detail :comment="comment" v-for="(comment,index) in list" :key="index"></Comment-detail>
    </van-list>
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
      limit: 20
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
</style>
