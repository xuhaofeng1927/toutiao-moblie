<template>
  <div class="reply-comment">
    <van-nav-bar title="0条回复" @click-left="$emit('onClickClose')">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <Comment-detail :comment="comment"></Comment-detail>
  </div>
</template>

<script>
export default {
  name: 'replyComment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: white;
  .van-nav-bar__title {
    color: rgb(0, 153, 255);
  }
}
</style>
