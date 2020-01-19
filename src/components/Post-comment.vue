<template>
  <div class="post-comment">
    <van-field
      :value="value"
      @input="onInput"
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
      @click="$emit('click-post')"
    >发布</van-button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    // value表示事件参数，在模板中使用$event表示,但是由于处于理解考虑我没有考虑简写
    onInput (value) {
      this.$emit('input', value)
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
