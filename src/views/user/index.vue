<template>
  <div class="user-container">
    <!-- 导航信息 -->
    <van-nav-bar :title="user.name" left-arrow @click-left="onback" />
    <!-- /导航信息 -->
    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image class="col1" fit="cover" round :src="user.photo" />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{user.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{user.follow_count}}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{user.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{user.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button type="primary" size="small">私信</van-button>
            <van-button type="info" size="small">关注</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{user.certi}}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{user.intro}}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->
    <!-- 列表组件 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
    <!-- /列表组件 -->
  </div>
</template>

<script>
import { getAutherUserInfo } from '@/api/user'
import { getArticlesUserInfo } from '@/api/articles'
export default {
  data () {
    return {
      user: {},
      list: [],
      loading: false,
      finished: false,
      page: 1 // 默认获取第一页
    }
  },
  methods: {
    onback () {
      this.$router.go(-1)
    },
    // 获取其他用户信息
    async getAutherUserInfo () {
      try {
        const { userId } = this.$route.params // 获取动态IdS
        const { data } = await getAutherUserInfo(userId)
        this.user = data.data
      } catch (error) {
        this.$toast('获取用户信息失败')
      }
    },
    // 获取用户文章列表
    async onLoad () {
      const { data } = await getArticlesUserInfo(this.$route.params.userId, {
        page: this.page, // 当前页
        per_page: 20 // 每页加载的条数
      })
      const { results } = data.data // 获取文章最新列表
      // console.log(results)
      this.list.push(...results) // 将每次获取到的数据添加到list数据中
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (this.list.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  },
  created () {
    if (this.$store.state.user) {
      this.getAutherUserInfo()
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    > .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      > .col1 {
        width: 80px;
        height: 80px;
      }
      > .col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        > .row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
      .intro-wrap {
        display: flex;
        height: 60px;
        justify-content: space-between;
      }
    }
  }
}
</style>
