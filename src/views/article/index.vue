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
            <p class="time">{{ArticleList.pubdate | Relativetime}}</p>
          </div>
        </div>
        <!-- 1，如果用户没有登录    2，如果当前文章作者不是当前登录用户 这两个条件下不能显示关注按钮-->
        <van-button
          v-if="!user || ArticleList.aut_id !== user.id"
          class="follow-btn"
          :type="ArticleList.is_followed?'info':'default'"
          size="small"
          round
          :loading="isfollowed"
          @click="onFollow(ArticleList.is_followed)"
        >{{ ArticleList.is_followed ? '已关注' : '+ 关注' }}</van-button>
      </div>
      <div class="markdown-body" v-html="ArticleList.content"></div>

      <!-- 文章评论 -->
      <br />
      <hr />
      <div style="font-size:16px;">全部评论</div>
      <Article-comment :articleId="articleId" ref="ArticleComment" @click-reply="onReplyShow"></Article-comment>
      <!-- /文章评论 -->
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
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPopupShow = true"
      >写评论</van-button>
      <van-icon class="comment-icon" name="comment-o" info="9" />
      <van-icon
        color="orange"
        :name="ArticleList.is_collected?'star':'star-o'"
        @click="onCollect(ArticleList.is_collected)"
      />
      <van-icon
        color="#e5645f"
        :name="ArticleList.attitude===1?'good-job':'good-job-o'"
        @click="onLike(ArticleList.attitude)"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
    <!-- 发表文章评论框弹出 -->
    <van-popup v-model="isPopupShow" position="bottom" :style="{ height: '18%' }">
      <Post-comment v-model="postMessage" @click-post="onPost"></Post-comment>
    </van-popup>
    <!-- /发表文章评论框弹出 -->
    <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '90%' }">
      <Reply-comment :comment="currentComment" @onClickClose="isReplyShow=false"></Reply-comment>
    </van-popup>
  </div>
</template>

<script>
import {
  getArticleById,
  addCollect,
  cancelCollect,
  addLike,
  cancelLike,
  addFollow,
  cancelFollow
} from '@/api/articles'
// vuex 模块提供了一些辅助方法，专门用来让我们更方便的获取容器中的数据
// mapState：映射获取 state 数据
// mapMutation：映射获取 mutation 数据
// maoAction：映射获取 action 数据
import { mapState } from 'vuex'
import { addComments } from '@/api/comment'
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
      ArticleList: {}, // 文章详情列表
      isfollowed: false, // 关注按钮加载状态
      isPopupShow: false, // 评论弹出开关
      postMessage: '', // 绑定输入框的数值
      isReplyShow: false, // 回复弹出开关
      currentComment: {} // 记录当前（一级）评论
    }
  },
  computed: {
    // mapState 方法返回一个对象，对象中就是映射过来的容器中的数据成员
    // ... 操作符就是把一个对象展开，混入当前对象中
    ...mapState(['user'])
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
    // 收藏OR取消收藏
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
    },
    // 点赞OR取消点赞
    async onLike (Like) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      if (Like === 1) {
        // 如果是以点赞状态，要取消点赞
        await cancelLike(this.articleId)
        this.ArticleList.attitude = -1
        this.$toast.success('取消点赞')
      } else {
        // 如果是未点赞，要点赞
        await addLike(this.articleId)
        this.ArticleList.attitude = 1
        this.$toast.success('点赞成功')
      }
    },
    // 关注OR未关注
    async onFollow (Follow) {
      this.isfollowed = true // 打开加载开关
      const Autorid = this.ArticleList.aut_id // 作者id 不是文章id
      try {
        if (Follow) {
          // 已关注
          await cancelFollow(Autorid)
        } else {
          // 为关注
          await addFollow(Autorid)
        }
        this.ArticleList.is_followed = !this.ArticleList.is_followed // 取反返回数据
        this.$toast.success(Follow ? '取消关注' : '关注成功')
      } catch (error) {
        // 跳转到用户登录页面
        this.$router.push('/login')
      }

      this.isfollowed = false // 数据加载完成后关闭加载状态
    },
    // 发表文章（对文章）评论
    async onPost () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComments({
          target: this.articleId,
          content: this.postMessage
        })
        // 清空数据
        this.postMessage = ''
        // 关闭弹层组件
        this.isPopupShow = false
        // 添加评论
        this.$refs.ArticleComment.list.unshift(data.data.new_obj)
        this.$toast.success('发布成功')
      } catch (error) {
        console.log(error)
        this.toast.fail('发布失败')
      }
    },
    // 点击回复弹出回复页面params当前评论的数据
    onReplyShow (params) {
      // 显示回复弹层
      this.isReplyShow = true
      // 将当前评论的数据记录起来
      this.currentComment = params
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
