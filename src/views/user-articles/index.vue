<template>
  <div class="user-articles">
    <!-- 导航栏 -->
    <van-nav-bar title="我的收藏/历史/作品" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->

    <van-tabs v-model="active" swipeable>
      <van-tab title="我的收藏">
          <myCollect/>
      </van-tab>
      <van-tab title="我的历史">
          <my-history/>
      </van-tab>
      <van-tab title="我的作品">
        <my-production/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import myProduction from './components/my-production'
import myCollect from './components/my-collect'
import myHistory from './components/my-history'
export default {
  name: 'UserArticles',
  data () {
    return {
      active: 2
    }
  },
  components: {
    myProduction,
    myCollect,
    myHistory
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
