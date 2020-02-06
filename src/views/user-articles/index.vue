<template>
  <div class="user-articles">
    <!-- 导航栏 -->
    <van-nav-bar title="我的收藏/历史/作品" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->

    <van-tabs v-model="active" swipeable>
      <van-tab title="我的收藏">内容 1</van-tab>
      <van-tab title="我的历史">内容 2</van-tab>
      <van-tab title="我的作品">
        <my-production/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import myProduction from './components/my-production'
export default {
  name: 'UserArticles',
  data () {
    return {
      active: 2
    }
  },
  components: {
    myProduction
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
