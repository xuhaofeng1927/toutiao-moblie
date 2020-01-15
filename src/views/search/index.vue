<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @input="onSearchInput"
      />
    </form>
    <!-- /搜索栏 -->
    <Search-result v-if="isResultShow" :q="searchContent"></Search-result>
    <!-- 搜索结果 -->
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell icon="search" :title="item" v-for="(item,index) in suggestions" :key="index">
        <!-- 我们要把 item 处理成带有高亮的字符串 -->
        <!-- 过滤器：专门用于文本格式化，但是它只能用在 {{}} 和 v-bind 中 -->
        <div slot="title" v-html="lightText(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete" />
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </van-cell>

      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash' // 引入防抖规则函数
export default {
  name: 'SearchPage',
  props: {},
  data () {
    return {
      searchContent: '', // 搜索内容
      // 控制搜索结果的显示状态
      isResultShow: false,
      suggestions: [] // 联想记忆数据
    }
  },
  methods: {
    onSearch () {
      this.isResultShow = true
    },
    onCancel () {
      console.log('onCancel')
    },
    // debounce 函数
    // 参数1：函数
    // 参数2：防抖时间
    // 返回值：防抖之后的函数，和参数1功能是一样的
    // 输入事件获取联想记忆数据
    onSearchInput: debounce(async function () {
      const searchContent = this.searchContent // 接收输入数据
      if (!searchContent) {
        return // 如果为空结束并返回
      }
      // 获取联想记忆数据
      const { data } = await getSuggestions(searchContent)
      // 2. 将数据添加到组件实例中
      this.suggestions = data.data.options
      console.log(data.data.options)
    }, 500),
    // 替换高亮字体方法（正则表达）
    lightText (str) {
      const reg = new RegExp(this.searchContent, 'ig')
      return str.replace(reg, `<span style="color: deeppink">${this.searchContent}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
