<template>
   <van-cell class="comment-item">
    <!-- 评论作者头像 -->
    <van-image
      slot="icon"
      class="avatar"
      round
      :src="comment.aut_photo"
    />
    <!-- 评论作者头像 -->

    <!-- 评论作者名字 -->
    <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
    <!-- 评论作者名字 -->

    <div slot="label">
      <!-- 评论内容 -->
      <p style="color: #363636;">{{ comment.content }}</p>
      <!-- /评论内容 -->

      <p>
        <!-- 评论发布日期 -->
        <span style="margin-right: 10px;">{{ comment.pubdate | Relativetime}}</span>
        <!-- 评论发布日期 -->

        <van-button
          size="mini"
          type="default"
          @click="$emit('click-reply',comment)"
        >回复 {{ comment.reply_count }}</van-button>
      </p>
    </div>
    <div slot="right-icon" class="like-container" @click="onLike">
      <van-icon
        :color="comment.is_liking ? '#e5645f' : ''"
        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
      />
      <span>{{ comment.like_count ? comment.like_count : '赞' }}</span>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, cancelCommentLike } from '@/api/comment'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
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
.comment-item {
  display: flex;
  align-items: flex-start;
  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .like-container {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
}
</style>
