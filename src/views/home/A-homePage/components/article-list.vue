<template>
  <div class="article-list-container">
    <!-- 列表组件 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
    <!-- /列表组件 -->
  </div>
</template>

<script>
import { getChannelsArticles } from '@/api/articles'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      // 接收父容器传过来的值
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null // 用于获取下一页数据的时间戳
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getChannelsArticles({
        channel_id: this.channel.id, // 频道切换传过来的id
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      const { results } = data.data
      console.log(this.channel.id)

      console.log(results)
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }

}
</script>

<style>
</style>
