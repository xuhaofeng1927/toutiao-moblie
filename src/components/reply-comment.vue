<template>
  <div class="reply-comment">
    <van-nav-bar :title="`${comment.reply_count}条回复`" @click-left="$emit('onClickClose')">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <Comment-detail :comment="comment"></Comment-detail>
    <van-cell title="所有评论" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <Comment-detail :comment="comment" v-for="(comment,index) in list" :key="index"></Comment-detail>
    </van-list>

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
       :color="comment.is_liking ? '#e5645f' : ''"
        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
    </div>
    <!-- /底部区域 -->
      <!-- 发表文章评论框弹出 -->
    <van-popup v-model="isPostShow" position="bottom" :style="{ height: '18%' }">
      <Post-comment v-model="postMessage" @click-post="onPost"></Post-comment>
    </van-popup>
    <!-- /发表文章评论框弹出 -->
  </div>
</template>

<script>
import { getComments, addComments, addCommentLike, cancelCommentLike } from '@/api/comment'
export default {
  name: 'replyComment',
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isPostShow: false, // 回复评论弹层
      postMessage: ''
    }
  },
  methods: {
    // 展示回复列表
    async onLoad () {
      // 1,请求获取列表数据
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      const { results } = data.data
      // 2，将数据添加到列表
      this.list.push(...results)
      // 3，关闭loading
      this.loading = true
      // 4，判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    // 发表文章（对一级回复）评论
    async onPost () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComments({
          target: this.comment.com_id.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.postMessage, // 评论内容
          art_id: this.articleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        // 清空评论内容
        this.postMessage = ''
        // 关闭弹层
        this.isPostShow = false
        // 将数据添加到列表顶部
        this.list.unshift(data.data.new_obj)
        // 更新回复的总数量
        this.comment.reply_count++
        this.$toast.success('发布成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('发布失败')
      }
    },
    // 回复点赞OR取消点赞
    async onLike () {
      try {
        const commentId = this.comment.com_id.toString()
        if (this.comment.is_liking) {
        // 如果是点赞状态则取消点赞
          await cancelCommentLike(commentId)
          this.comment.like_count--
        } else {
        // 如果是取消状态则点赞
          await addCommentLike(commentId)
          this.comment.like_count++
        }
        // 更新视图
        this.comment.is_liking = !this.comment.is_liking
        this.$toast.success('操作成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: white;
  .van-nav-bar__title {
    color: rgb(0, 153, 255);
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
  }
</style>
