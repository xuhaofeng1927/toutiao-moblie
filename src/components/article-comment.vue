<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <Comment-detail v-for="(item,index) in list" :key="index" :comment="item"></Comment-detail>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  props: {
    // 接收父组件传过来的文章id
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 20
    }
  },
  methods: {
    // 上滑获取评论列表数据
    async onLoad () {
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      const { results } = data.data // 获取对应的评论数
      console.log(results)

      this.list.push(...results) // 加载在后面
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
