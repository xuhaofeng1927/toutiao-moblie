<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch(searchContent)"
        @cancel="onCancel(searchContent)"
        @input="onSearchInput"
      />
    </form>
    <!-- /搜索栏 -->
    <Search-result v-if="isResultShow" :q="searchContent"></Search-result>
    <!-- 搜索结果 -->
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell
        icon="search"
        :title="item"
        v-for="(item,index) in suggestions"
        @click="onSearch(item)"
        :key="index"
      >
        <!-- 我们要把 item 处理成带有高亮的字符串 -->
        <!-- 过滤器：专门用于文本格式化，但是它只能用在 {{}} 和 v-bind 中 -->
        <div slot="title" v-html="lightText(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete" v-show="!isDeleteShow" @click="isDeleteShow=!isDeleteShow" />
        <span v-show="isDeleteShow" @click="searchHistories = []">全部删除</span>
        &nbsp;&nbsp;
        <span v-show="isDeleteShow" @click="isDeleteShow=!isDeleteShow">完成</span>
      </van-cell>

      <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="onHistoryClick(item,index)">
        <van-icon name="close" v-show="isDeleteShow"></van-icon>
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
      suggestions: [], // 联想记忆数据
      searchHistories: [], // 搜索历史记录数据
      isDeleteShow: false // 控制历史记录删除条件
    }
  },
  methods: {
    // 搜索时执行
    onSearch (value) {
      // value: 输入框当前值
      // 更新搜索文本框的数据(三种状态输入关键字，联想建议关键字，历史记录关键字)
      this.searchContent = value
      // 定义一个变量接收本次历史记录
      const searchHistories = this.searchHistories
      // 定义一个变量接收【本次历史记录】是否存在 （搜索框中） 的一个值
      const index = searchHistories.indexOf(value)
      if (index !== -1) {
        searchHistories.splice(index) // 如果存在     删除当前数据
      }
      this.searchHistories.unshift(value) // 如果不存在   在数组前面添加新数据
      // 搜索结果组件显示状态
      this.isResultShow = true
    },
    onCancel (value) {
      if (value) {
        console.log('onCancel')
      }
    },
    onHistoryClick (item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 否则执行搜索操作
        this.onSearch(item)
      }
    },

    // debounce 函数
    // 参数1：函数
    // 参数2：防抖时间
    // 返回值：防抖之后的函数，和参数1功能是一样的
    // 输入事件获取联想记忆数据
    onSearchInput: debounce(async function () {
      this.isResultShow = false // 输入状态下隐藏搜索结果
      const searchContent = this.searchContent // 接收输入数据
      if (!searchContent) {
        return // 如果为空结束并返回
      }
      // 获取联想记忆数据
      const { data } = await getSuggestions(searchContent)
      // 2. 将数据添加到组件实例中
      this.suggestions = data.data.options
    }, 200),
    // 替换高亮字体方法（正则表达）
    lightText (str) {
      const reg = new RegExp(this.searchContent, 'ig')
      return str.replace(
        reg,
        `<span style="color: deeppink">${this.searchContent}</span>`
      )
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
