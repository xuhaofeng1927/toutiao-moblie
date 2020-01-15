<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow fixed @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading class="loading" color="#1989fa" vertical v-if="loading">
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="ArticleList.title">
      <h3 class="title">{{ArticleList.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image class="avatar" round fit="cover" :src="ArticleList.aut_photo" />
          <div class="text">
            <p class="name">{{ArticleList.aut_name}}</p>
            <p class="time">{{ArticleList.pubdate}}</p>
          </div>
        </div>
        <van-button class="follow-btn" type="info" size="small" round>+ 关注</van-button>
      </div>
      <div class="markdown-body" v-html="ArticleList.content"></div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network" />
      <p class="text">亲，网络不给力哦~</p>
      <van-button class="btn" type="default" size="small" @click="getArticle()">点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button class="write-btn" type="default" round size="small">写评论</van-button>
      <van-icon class="comment-icon" name="comment-o" info="9" />
      <van-icon color="orange" :name="ArticleList.is_collected?'star':'star-o'"  @click="onCollect(ArticleList.is_collected)"/>
      <van-icon color="#e5645f" name="good-job" />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById, addCollect, cancelCollect } from '@/api/articles'
export default {
  name: 'ArticlePage',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true, // 控制加载状态的显示
      ArticleList: {} // 文章详情列表
    }
  },
  methods: {
    // 获取文章详情列表
    async getArticle () {
      this.loading = true // 重新加载时显示加载状态
      try {
        const { data } = await getArticleById(this.articleId)
        this.ArticleList = data.data
      } catch (error) {
        console.log(error)
      }
      this.loading = false //
    },
    async onCollect (collected) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      if (collected) {
        // 如果是以收藏，要取消收藏
        await cancelCollect(this.articleId)
        this.ArticleList.is_collected = false
        this.$toast.success('取消收藏')
      } else {
        await addCollect(this.articleId)
        this.ArticleList.is_collected = true
        this.$toast.success('收藏成功')
      }
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3a3a3a;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
