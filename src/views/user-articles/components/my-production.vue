<template>
  <div class="my-production">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.title"
        @click=" router.push({
        name: 'article',
        params: {
          articleId: item.art_id.toString()
        }
      })"
      />
    </van-list>
  </div>
</template>

<script>
import { getCurrentUserArticles } from '@/api/articles'
import router from '@/router'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      router,
      page: 1, // 当前页码
      perPage: 10 // 每页大小
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getCurrentUserArticles({
        page: this.page, // 当前页码
        perPage: this.perPage // 每页大小
      })
      // 获取每次请求的数据
      const { results } = data.data
      // 加载到列表数据中
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.page++ // 更新数据
      } else {
        // 完成刷新
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
