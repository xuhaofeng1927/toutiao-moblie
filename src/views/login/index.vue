<template>
  <div class="login">
    <!--引入导航 -->
    <van-nav-bar title="登录" />
    <!--引入输入框-->
    <div class="login-field">
      <van-field placeholder="请输入用户名/手机号/邮箱" left-icon="user-o" v-model="user.mobile"></van-field>
      <van-field placeholder="请输入验证码" v-model="user.code">
        <van-icon slot="left-icon" class-prefix="icont" name="mima" />
        <van-button
          v-if="isCountDownShow"
          v-model="verityvalue"
          slot="button"
          size="small"
          type="primary"
          @click="getverity"
        >{{verityvalue}}</van-button>
        <van-count-down
          v-else
          slot="button"
          :time="60 * 1000"
          @finish="backverify"
          format="ss 秒后重新获取"
        />
      </van-field>
    </div>
    <div class="loginBtn">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { getUsersLogin, getverity } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: true,
      verityvalue: '点击获取'
    }
  },
  methods: {
    // 用户登录
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
    },
    // 获取验证码
    async getverity () {
      // 验证手机号是否为空
      if (this.user.mobile) {
        // 隐藏标签
        this.isCountDownShow = false

        const { mobile } = this.user
        // 验证手机号是否存在

        // 请求数据
        try {
          let result = await getverity(mobile)
          console.log('成功', result)
        } catch (error) {
          this.$toast.fail('请勿频繁操作')
        }
      } else {
        this.$toast.fail('请输入手机号')
      }
    },
    // 倒计时结束执行
    backverify () {
      this.isCountDownShow = true
      this.verityvalue = '重新获取验证码'
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
