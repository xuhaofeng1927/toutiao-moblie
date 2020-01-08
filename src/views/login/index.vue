<template>
  <div class="login">
    <!--引入导航 -->
    <van-nav-bar title="登录" />
    <!--引入输入框-->
    <div class="login-field">
      <van-field placeholder="请输入用户名" left-icon="user-o" v-model="user.mobile"></van-field>
      <van-field placeholder="请输入验证码" v-model="user.code">
        <van-icon slot="left-icon" class-prefix="icont" name="mima" />
      </van-field>
    </div>
    <div class="loginBtn">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { getUsersLogin } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onLogin () {
      // 使用轻提示
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      // 1,获取数据
      const user = this.user
      console.log(user)
      try {
        // 2，请求参数
        let result = await getUsersLogin(user)
        // 3，返回数据
        console.log('成功', result)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log('失败', error)
        this.$toast.fail('用户名或密码错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-field {
  margin-top: 20px;
  .van-cell {
    height: 50px;
    padding: 10px 20px;
    align-items: center;
    .login-btn {
      width: 100%;
    }
  }
}
.loginBtn {
  margin-top: 20px;
  padding: 27px 16px;
  .van-button {
    width: 100%;
    background-color: #6db4fb;
  }
}
</style>
