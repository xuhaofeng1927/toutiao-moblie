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
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender?'女':'男'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getPersonUserxInfo } from '@/api/user'
export default {
  data () {
    return {
      user: {} // 接收用户个人信息
    }
  },
  methods: {
    onback () {
      this.$router.go(-1)
    },
    async getPersonUserxInfo () {
      try {
        const { data } = await getPersonUserxInfo()
        this.user = data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getPersonUserxInfo()
  }
}
</script>

<style scoped lan="less">
.van-nav-bar__text {
  color: white;
}
</style>
