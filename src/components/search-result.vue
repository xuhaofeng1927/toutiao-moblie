<template>
  <!--  搜索结果 -->
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  props: {
    q: {
      type: String,
      require: true
    } // 接收父组件的文本框数据(搜索关键字)
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      perPage: 20 // 每页条数
    }
  },
  methods: {
    // 搜索结果上滑刷新
    async onLoad () {
      // 异步更新数据
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页条数
        q: this.q // 搜索关键字
      })
      // 获取每次请求到的数据
      const { results } = data.data
      // 向后添加到列表数据中
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    }
  }
}
</script>

<style>
</style>
