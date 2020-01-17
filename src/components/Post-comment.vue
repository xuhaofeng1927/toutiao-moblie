<template>
  <div class="post-comment">
    <van-field
      v-model="content"
      rows="2"
      autosize
      type="textarea"
      maxlength="100"
      placeholder="神评一定是你的"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
    >发布</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style lang='less' scoped>
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
