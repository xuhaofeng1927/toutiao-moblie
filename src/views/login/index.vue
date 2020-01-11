<template>
  <div class="login">
    <!--引入导航 -->
    <van-nav-bar title="登录" />
    <!--引入输入框-->
    <div class="login-field">
      <!--
      表单验证
      1、使用 ValidationObserver 组件把需要验证的整个表单包起来
      2、使用 ValidationProvider 组件把具体的表单元素包起来，例如 input
         name   配置字段的提示名称
         rules  配置校验规则
         v-slot="{ errors }" 获取校验失败的错误提示消息
      -->
      <ValidationObserver ref="myform">
        <ValidationProvider name="手机号" rules="required|mobile" immediate v-slot="{ errors }">
          <van-field placeholder="请输入用户名/手机号/邮箱" left-icon="user-o" v-model="user.mobile"></van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|code" immediate v-slot="{ errors }">
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
              :time="6 * 1000"
              @finish="backverify"
              format="ss 秒后重新获取"
            />
          </van-field>
        </ValidationProvider>
      </ValidationObserver>
    </div>
    <div class="loginBtn">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { getUsersLogin, getverity } from '@/api/user'
import { validate } from 'vee-validate' // 引入自定义校验规则
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
      // 手动触发校验
      let result = await this.$refs.myform.validate() // 异步转为同步(result为boolen值)
      if (!result) {
        // 不存在时执行返回
        const errors = this.$refs.myform.errors // 获取错误返回对象
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0]) // 当符合条件时返回错误提示信息
            return // 符合条件时返回
          }
        }
      } else {
        // 存在时执行以下代码

        // 使用轻提示
        this.$toast.loading({
          duration: 0, // 持续时间，0表示持续展示不停止
          forbidClick: true, // 是否禁止背景点击
          message: '登录中...' // 提示消息
        })
        try {
        // 1,获取数据
          const user = this.user
          console.log(user)
          // 2，请求参数
          let result = await getUsersLogin(user)
          // 3，返回数据
          console.log('成功', result)

          // 4，Vuex 存储Token 提交监听事件  传递数据 存储token数据
          this.$store.commit('setuser', result.data.data)
          this.$toast.success('登录成功')
        } catch (error) {
          console.log('失败', error)
          this.$toast.fail('用户名或密码错误')
        }
      }
    },
    // 获取验证码
    async getverity () {
      // 获取手机号
      const { mobile } = this.user
      // 验证手机号是否存在

      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 参数1：要验证的数据
      // 参数2：验证规则
      // 参数3：一个可选的配置对象，例如配置错误消息字段名称 name
      // 返回值：{ valid, errors, ... }
      //          valid: 验证是否成功，成功 true，失败 false
      //          errors：一个数组，错误提示消息

      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      // 隐藏标签
      this.isCountDownShow = false

      // 请求数据
      try {
        let result = await getverity(mobile)
        console.log('成功', result)
      } catch (error) {
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送')
        } else {
          this.$toast.fail('发送失败')
        }
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
