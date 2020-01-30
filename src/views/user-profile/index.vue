<template>
  <div class="user-info">
    <!-- 导航信息 -->
    <van-nav-bar title="用户信息" left-arrow @click-left="onback" right-text="保存" />
    <!-- /导航信息 -->
    <van-cell-group>
      <van-cell title="头像">
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          src=""
        />
      </van-cell>
      <van-cell title="昵称" value="abc" is-link />
      <van-cell title="性别" value="男" is-link />
      <van-cell title="生日" value="2019-9-27" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  methods: {
    onback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lan="less">
.van-nav-bar__text {
  color: white;
}
</style>
