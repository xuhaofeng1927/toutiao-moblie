<template>
  <div class="user-articles">
    <!-- 导航栏 -->
    <van-nav-bar title="我的收藏/历史/作品" left-arrow @click-left="$router.back()" fixed/>
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
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2
    }
    return {
      active // 控制激活的标签选项

    }
  },
  // 接收文章状态类型
  props: ['type'],
  components: {
    myProduction,
    myCollect,
    myHistory
  },
  methods: {}
}
</script>

<style scoped lang="less">
.user-articles {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
